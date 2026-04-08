set -e

COMMAND=$1
DOCKER_COMPOSE_FILE="infra/docker/docker-compose.yml"

case "$COMMAND" in
  up)
    echo "🚀 Starting infrastructure..."
    docker compose -f $DOCKER_COMPOSE_FILE up -d
    ;;
  down)
    echo "🛑 Stopping infrastructure..."
    docker compose -f $DOCKER_COMPOSE_FILE down
    ;;
  restart)
    echo "🔄 Restarting infrastructure..."
    docker compose -f $DOCKER_COMPOSE_FILE restart
    ;;
  logs)
    docker compose -f $DOCKER_COMPOSE_FILE logs -f
    ;;
  *)
    echo "Usage: $0 {up|down|restart|logs}"
    exit 1
esac
