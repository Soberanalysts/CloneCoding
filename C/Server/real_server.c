// Visual Studio에서 사용 가능
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock2.h>
#include <stdio.h>

#pragma comment(lib, "ws2_32.lib")

int main() {
    WSADATA wsa;
    SOCKET server, client;
    struct sockaddr_in addr, client_addr;
    int client_len = sizeof(client_addr);
    char buffer[1024] = { 0 };

    WSAStartup(MAKEWORD(2, 2), &wsa);
    server = socket(AF_INET, SOCK_STREAM, 0);

    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8081);

    bind(server, (SOCKADDR*)&addr, sizeof(addr));
    listen(server, 1);
    printf("진짜 서버 대기 중 (포트 8081)...\n");

    client = accept(server, (SOCKADDR*)&client_addr, &client_len);
    recv(client, buffer, sizeof(buffer), 0);
    printf("프록시로부터 받은 메시지: %s\n", buffer);

    send(client, "응답 from Real Server", strlen("응답 from Real Server"), 0);

    closesocket(client);
    closesocket(server);
    WSACleanup();
    return 0;
}
