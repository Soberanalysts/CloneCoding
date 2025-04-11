#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib, "ws2_32.lib") // Winsock 라이브러리 링크

int main() {
    WSADATA wsaData;
    SOCKET clientSocket;
    struct sockaddr_in serverAddr;
    char buffer[1024] = { 0 };
    const char* message = "Hello from Windows Client!";

    // 1. WSA 초기화
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup 실패\n");
        return 1;
    }

    // 2. 소켓 생성
    clientSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (clientSocket == INVALID_SOCKET) {
        printf("소켓 생성 실패\n");
        WSACleanup();
        return 1;
    }

    // 3. 서버 주소 설정
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8080);
    serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1"); // 로컬 서버 접속

    // 4. 서버에 연결
    if (connect(clientSocket, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("서버 연결 실패\n");
        closesocket(clientSocket);
        WSACleanup();
        return 1;
    }

    // 5. 메시지 전송
    send(clientSocket, message, strlen(message), 0);

    // 6. 응답 수신
    recv(clientSocket, buffer, sizeof(buffer), 0);
    printf("서버 응답: %s\n", buffer);

    // 7. 정리
    closesocket(clientSocket);
    WSACleanup();
    return 0;
}