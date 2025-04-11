#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib, "ws2_32.lib") // ���� ���̺귯�� ��ũ

int main() {
    WSADATA wsaData;
    SOCKET serverSocket, clientSocket;
    struct sockaddr_in serverAddr, clientAddr;
    int clientSize;
    char buffer[1024];

    // 1. WSA �ʱ�ȭ
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup ����\n");
        return 1;
    }

    // 2. ���� ����
    serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == INVALID_SOCKET) {
        printf("���� ���� ����\n");
        WSACleanup();
        return 1;
    }

    // 3. �ּ� ����
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8080);
    serverAddr.sin_addr.s_addr = INADDR_ANY;

    // 4. ���ε�
    if (bind(serverSocket, (SOCKADDR*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("bind ����\n");
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    // 5. ����
    if (listen(serverSocket, 5) == SOCKET_ERROR) {
        printf("listen ����\n");
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    printf("���� ��� ��...\n");

    // 6. Ŭ���̾�Ʈ ���� ����
    clientSize = sizeof(clientAddr);
    clientSocket = accept(serverSocket, (SOCKADDR*)&clientAddr, &clientSize);
    if (clientSocket == INVALID_SOCKET) {
        printf("accept ����\n");
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    // 7. ����
    recv(clientSocket, buffer, sizeof(buffer), 0);
    printf("Ŭ���̾�Ʈ �޽���: %s\n", buffer);

    // 8. ����
    const char* msg = "Hello from Windows Server!";
    send(clientSocket, msg, strlen(msg), 0);

    // 9. ����
    closesocket(clientSocket);
    closesocket(serverSocket);
    WSACleanup();
    return 0;
}