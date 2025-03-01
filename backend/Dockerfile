FROM python:3.9

WORKDIR /app

# Install required packages
RUN apt-get update && apt-get install -y default-mysql-client

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
