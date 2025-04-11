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

    // WSA �ʱ�ȭ
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup ����\n");
        return 1;
    }

    // ���Ͻ� ���� ���� ����
    listenSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (listenSocket == INVALID_SOCKET) {
        printf("���Ͻ� ���� ���� ����\n");
        WSACleanup();
        return 1;
    }

    proxyAddr.sin_family = AF_INET;
    proxyAddr.sin_port = htons(LISTEN_PORT);
    proxyAddr.sin_addr.s_addr = INADDR_ANY;

    if (bind(listenSocket, (SOCKADDR*)&proxyAddr, sizeof(proxyAddr)) == SOCKET_ERROR) {
        printf("���Ͻ� ���ε� ����\n");
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    listen(listenSocket, 1);
    printf("���Ͻ� ���� ��� ��... (��Ʈ %d)\n", LISTEN_PORT);

    clientSocket = accept(listenSocket, (SOCKADDR*)&clientAddr, &clientLen);
    if (clientSocket == INVALID_SOCKET) {
        printf("Ŭ���̾�Ʈ ���� ����\n");
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    printf("Ŭ���̾�Ʈ �����!\n");

    // ���� ������ ����
    serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(TARGET_PORT);
    serverAddr.sin_addr.s_addr = inet_addr(TARGET_IP);

    if (connect(serverSocket, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("���� ���� ���� ����\n");
        closesocket(clientSocket);
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    printf("���� ���� ���� ����!\n");

    // Ŭ���̾�Ʈ�κ��� ������ ���� �� ���� ������ ����
    bytesRead = recv(clientSocket, buffer, BUFFER_SIZE, 0);
    if (bytesRead > 0) {
        printf("Ŭ���̾�Ʈ�κ���: %s\n", buffer);
        send(serverSocket, buffer, bytesRead, 0);
    }

    // ���� �����κ��� ���� ���� �� Ŭ���̾�Ʈ�� ����
    bytesRead = recv(serverSocket, buffer, BUFFER_SIZE, 0);
    if (bytesRead > 0) {
        printf("���� �����κ���: %s\n", buffer);
        send(clientSocket, buffer, bytesRead, 0);
    }

    // ����
    closesocket(clientSocket);
    closesocket(serverSocket);
    closesocket(listenSocket);
    WSACleanup();

    printf("���Ͻ� ���� ����\n");
    return 0;
}