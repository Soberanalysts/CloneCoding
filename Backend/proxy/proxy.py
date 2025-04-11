import socket

proxy_host = '127.0.0.1'
proxy_port = 8888

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
    server_socket.bind((proxy_host, proxy_port))
    server_socket.listen()
    print(f"프록시 서버 실행 중: {proxy_host}:{proxy_port}")

    client_socket, addr = server_socket.accept()
    with client_socket:
        print(f"클라이언트 연결됨: {addr}")
        data = client_socket.recv(4096)

        # 실제 서버로 요청
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as target_socket:
            target_socket.connect(('example.com', 80))
            target_socket.sendall(data)
            response = target_socket.recv(4096)

        client_socket.sendall(response)