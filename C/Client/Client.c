#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib, "ws2_32.lib") // Winsock ���̺귯�� ��ũ

int main() {
    WSADATA wsaData;
    SOCKET clientSocket;
    struct sockaddr_in serverAddr;
    char buffer[1024] = { 0 };
    const char* message = "Hello from Windows Client!";

    // 1. WSA �ʱ�ȭ
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup ����\n");
        return 1;
    }

    // 2. ���� ����
    clientSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (clientSocket == INVALID_SOCKET) {
        printf("���� ���� ����\n");
        WSACleanup();
        return 1;
    }

    // 3. ���� �ּ� ����
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8080);
    serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1"); // ���� ���� ����

    // 4. ������ ����
    if (connect(clientSocket, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("���� ���� ����\n");
        closesocket(clientSocket);
        WSACleanup();
        return 1;
    }

    // 5. �޽��� ����
    send(clientSocket, message, strlen(message), 0);

    // 6. ���� ����
    recv(clientSocket, buffer, sizeof(buffer), 0);
    printf("���� ����: %s\n", buffer);

    // 7. ����
    closesocket(clientSocket);
    WSACleanup();
    return 0;
}