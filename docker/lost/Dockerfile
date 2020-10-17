ARG base_image=l3pcv/lost-base:1.0
FROM $base_image
RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm && rm -rf /var/lib/apt/lists/*
# Add Code
WORKDIR /
# ARG Foo=bar
ADD /docker/lost/entrypoint.sh /
ADD /docker/lost/pytest.sh /
ADD /docker/lost/nginx/ /code/docker/lost/nginx
ADD /backend/ /code/backend
# ARG Foo
ADD /frontend/ /code/frontend
RUN npm install --prefix code/frontend/lost/src/tools/sia -d
RUN npm install --prefix code/frontend/lost/src/components/pipeline -d
RUN npm install --prefix code/frontend/lost -d
RUN CI=false npm run build --prefix code/frontend/lost -d
RUN rm -rf code/frontend/lost/node_modules
RUN rm -rf code/frontend/lost/src/tools/sia/node_modules
RUN rm -rf code/frontend/lost/src/components/pipeline/node_modules
ADD /docs/ /code/docs
# Change to CLI
WORKDIR /code/backend/lost/cli
RUN echo "export PATH=$PATH:/code/backend/lost/cli" >> ~/.bashrc
RUN echo "conda activate lost" >> ~/.bashrc