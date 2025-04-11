#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib, "ws2_32.lib") // 소켓 라이브러리 링크

int main() {
    WSADATA wsaData;
    SOCKET serverSocket, clientSocket;
    struct sockaddr_in serverAddr, clientAddr;
    int clientSize;
    char buffer[1024];

    // 1. WSA 초기화
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup 실패\n");
        return 1;
    }

    // 2. 소켓 생성
    serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == INVALID_SOCKET) {
        printf("소켓 생성 실패\n");
        WSACleanup();
        return 1;
    }

    // 3. 주소 설정
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8080);
    serverAddr.sin_addr.s_addr = INADDR_ANY;

    // 4. 바인드
    if (bind(serverSocket, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("bind 실패\n");
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    // 5. 리슨
    if (listen(serverSocket, 5) == SOCKET_ERROR) {
        printf("listen 실패\n");
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    printf("서버 대기 중...\n");

    // 6. 클라이언트 연결 수락
    clientSize = sizeof(clientAddr);
    clientSocket = accept(serverSocket, (SOCKADDR*)&clientAddr, &clientSize);
    if (clientSocket == INVALID_SOCKET) {
        printf("accept 실패\n");
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    // 7. 수신
    recv(clientSocket, buffer, sizeof(buffer), 0);
    printf("클라이언트 메시지: %s\n", buffer);

    // 8. 응답
    const char* msg = "Hello from Windows Server!";
    send(clientSocket, msg, strlen(msg), 0);

    // 9. 정리
    closesocket(clientSocket);
    closesocket(serverSocket);
    WSACleanup();
    return 0;
}