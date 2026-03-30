pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
            git branch: 'main', url: 'https://github.com/MojaveMix/optician_project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker-compose build --no-cache'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('API Tests') {
            steps {
                script {
                    // Test the health endpoint of your server
                    bat 'docker-compose exec server curl http://localhost:8000/api/health'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Stop containers, ignore errors if already stopped
                    bat 'docker-compose down || exit 0'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}