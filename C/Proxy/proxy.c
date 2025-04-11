#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib, "ws2_32.lib")

#define LISTEN_PORT 8080
#define TARGET_IP "127.0.0.1"
#define TARGET_PORT 8081
#define BUFFER_SIZE 1024

int main() {
    WSADATA wsaData;
    SOCKET listenSocket, clientSocket, serverSocket;
    struct sockaddr_in proxyAddr, clientAddr, serverAddr;
    int clientLen = sizeof(clientAddr);
    char buffer[BUFFER_SIZE] = { 0 };
    int bytesRead;

    // WSA 초기화
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup 실패\n");
        return 1;
    }

    // 프록시 수신 소켓 생성
    listenSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (listenSocket == INVALID_SOCKET) {
        printf("프록시 소켓 생성 실패\n");
        WSACleanup();
        return 1;
    }

    proxyAddr.sin_family = AF_INET;
    proxyAddr.sin_port = htons(LISTEN_PORT);
    proxyAddr.sin_addr.s_addr = INADDR_ANY;

    if (bind(listenSocket, (SOCKADDR*)&proxyAddr, sizeof(proxyAddr)) == SOCKET_ERROR) {
        printf("프록시 바인드 실패\n");
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    listen(listenSocket, 1);
    printf("프록시 서버 대기 중... (포트 %d)\n", LISTEN_PORT);

    clientSocket = accept(listenSocket, (SOCKADDR*)&clientAddr, &clientLen);
    if (clientSocket == INVALID_SOCKET) {
        printf("클라이언트 연결 실패\n");
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    printf("클라이언트 연결됨!\n");

    // 실제 서버로 연결
    serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(TARGET_PORT);
    serverAddr.sin_addr.s_addr = inet_addr(TARGET_IP);

    if (connect(serverSocket, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("실제 서버 연결 실패\n");
        closesocket(clientSocket);
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    printf("실제 서버 연결 성공!\n");

    // 클라이언트로부터 데이터 수신 → 실제 서버로 전달
    bytesRead = recv(clientSocket, buffer, BUFFER_SIZE, 0);
    if (bytesRead > 0) {
        printf("클라이언트로부터: %s\n", buffer);
        send(serverSocket, buffer, bytesRead, 0);
    }

    // 실제 서버로부터 응답 수신 → 클라이언트로 전달
    bytesRead = recv(serverSocket, buffer, BUFFER_SIZE, 0);
    if (bytesRead > 0) {
        printf("실제 서버로부터: %s\n", buffer);
        send(clientSocket, buffer, bytesRead, 0);
    }

    // 정리
    closesocket(clientSocket);
    closesocket(serverSocket);
    closesocket(listenSocket);
    WSACleanup();

    printf("프록시 서버 종료\n");
    return 0;
}