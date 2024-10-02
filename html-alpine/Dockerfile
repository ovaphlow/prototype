# 使用官方的 Nginx 镜像
FROM nginx

# 删除 nginx 默认的静态资源
RUN rm -rf /usr/share/nginx/html/*

# 将我们的静态资源复制到 nginx 的静态资源目录下
# COPY ./html /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
