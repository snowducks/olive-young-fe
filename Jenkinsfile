pipeline {
    agent any

    tools {
        nodejs "npm"
    }

    environment {
        // 796973504685 는 AWS 계정 ID
        ECR_REGISTRY = "796973504685.dkr.ecr.ap-northeast-2.amazonaws.com"
        ECR_REPOSITORY = "olive-young-fe"
        IMAGE_TAG = "latest"
        AWS_REGION = "ap-northeast-2"
        AWS_ACCOUNT_ID = "796973504685"
    }

    stages {
        stage('Checkout') {
            steps {
                // SCM에서 소스를 가져옵니다.
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
             }
        }

        stage('Test') {
            steps {
                // 단위테스트, 통합테스트 등을 수행
                sh "npm run test"
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh "npm run build"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // 현재 디렉토리에 있는 Dockerfile을 사용해 Docker 이미지 빌드
                    // Jenkins 워크스페이스 내에서 docker build를 수행합니다.
                    def ecrImage = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker build --cache-from=${ecrImage} -t ${ecrImage} ."
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    withAWS(credentials: ECR_CREDENTIALS, region: AWS_REGION) {
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    }
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    def ecrImage = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker push ${ecrImage}"
                }
            }
        }
    }

    
    post {
        always {
            sh "docker logout ${ECR_REGISTRY}"

            echo "Pipeline이 종료되었습니다."
        }
        success {
            echo "성공적으로 빌드 및 푸시를 완료했습니다."
        }
        failure {
            echo "파이프라인 실행에 실패했습니다."
        }
    }
}
