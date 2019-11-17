FROM python:3.6.9

WORKDIR /app

RUN apt-get update -y && apt-get install -y postgresql-client
COPY requirements*.txt ./
RUN pip --no-cache-dir install -r requirements.txt

# Install migration tool
RUN curl -fsSL -o /usr/local/bin/dbmate https://github.com/amacneil/dbmate/releases/download/v1.7.0/dbmate-linux-amd64
RUN chmod +x /usr/local/bin/dbmate

COPY . /app

EXPOSE 5000

# sorry for bad security... we are in a hurry
ENV APP_SETTINGS=development
ENV PGHOST=pg-35c52044-villej-eec9.aivencloud.com
ENV PGPORT=12819
ENV PGUSER=avnadmin
ENV PGDATABASE=defaultdb
ENV PGSSLMODE=require
ENV REDISHOST=redis-16c88dcf-villej-eec9.aivencloud.com
ENV REDISPORT=12820
ENV DATABASE_URL=postgres://avnadmin:u4v2ffw0kn5x423z@pg-35c52044-villej-eec9.aivencloud.com:12819/defaultdb?sslmode=require
ENV PGPASSWORD=u4v2ffw0kn5x423z
ENV REDISPW=uzel52dguydxrt6p

CMD ["gunicorn", "-b", "0.0.0.0:5000", "-c", "gunicorn_config.py", "app:app", "--reload", "--log-file", "-",  "--log-level", "DEBUG", "--timeout", "100"]