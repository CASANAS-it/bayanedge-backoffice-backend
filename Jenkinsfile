pipeline {
     agent any
     environment {
        CI = "false"
     }
     stages {
        stage("Build") {
            steps {
                sh "npm -v"
                sh "npm install"
            }
        }
        stage("Move File") {
            steps {
                sh "cp -rf ${WORKSPACE}/* /opt/bayanedge/training/bayanedge-backoffice-backend"
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}