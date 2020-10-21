ARG base_image=l3pcv/lost-base:1.0
FROM $base_image
# Add Code
WORKDIR /
ADD /docker/lost/entrypoint.sh /
ADD /docker/lost/pytest.sh /
ADD /docker/lost/nginx/ /code/docker/lost/nginx
ADD /backend/ /code/backend
ADD /frontend/ /code/frontend
ADD /docs/ /code/docs
# Change to CLI
WORKDIR /code/backend/lost/cli
RUN echo "export PATH=$PATH:/code/backend/lost/cli" >> ~/.bashrc
RUN echo "conda activate lost" >> ~/.bashrc