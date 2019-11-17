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

CMD ["gunicorn", "-b", "0.0.0.0:5000", "-c", "gunicorn_config.py", "app:app", "--reload", "--log-file", "-",  "--log-level", "DEBUG", "--timeout", "100"]