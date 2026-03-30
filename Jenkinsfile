pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = "/usr/local/bin/docker-compose"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/MojaveMix/optician_project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build --no-cache'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('API Tests') {
            steps {
                //  sh 'docker-compose run --rm server npm test'
                         sh 'docker-compose exec -T server curl http://localhost:8000/api/health'

                  }
        }

  stage('Cleanup') {
    steps {
        sh 'docker-compose down || true'
    }
}
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}