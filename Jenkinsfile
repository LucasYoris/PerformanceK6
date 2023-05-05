def GIT_REPOSITORY = "https://github.com/LucasYoris/PerformanceK6.git"
def MAIL_TO = "lucasyoris3@gmail.com"
def MAIL_SUBJECT = 'Prueba de Performance - Ejecución # ${BUILD_NUMBER}'
def GIT_BRANCH = 'master'

pipeline {
    agent any
	
    parameters {
        string(name: 'SCENARIO_NAME', 
                    defaultValue: "ALL", 
                    description: 'Ingresar el nombre del escenario que quieres ejecutar. o escribe ALL si quieres ejecutar todos. Ejemplos: "scenario1" , "scenario2", "ALL"'
                )

		choice(
		    name: 'TIPO_PRUEBA',
            choices: ['stress', 'load','spike'],
            description: 'Elegir un tipo de prueba.'
			  )		

        string(name: 'DURATION',
		    		description: 'Especifique el tiempo en que quiere que se ejecute la prueba. (10s o 10m)'
				)

		  string(name: 'VUS',
		    		description: 'Especifique la cantidad de usuarios virtuales que quieres que se utilicen para la prueba. Ejemplos "5" , "10"'
				)

    }

    stages {
    
        stage('Clone Project Performance') {
            steps {
                deleteDir()
                git branch: GIT_BRANCH , credentialsId: 'lucasGitCredentials', url: GIT_REPOSITORY
            }
        }
        stage('Levantando Contenedor') {
           steps {
                    sh "docker-compose up -d influxdb grafana"
             }
        }
        stage('Instalando Dependencias NodeJs') {
           steps {
                    sh "docker-compose run --rm -w /nodejs nodejs npm install nodemailer"
             }
        }
        stage('Ejecutando Prueba Performance') {
            steps {
                script {
                    sh "docker-compose run --rm k6 run --env SCENARIO_NAME=all --env TEST_TYPE=stress --env STRESS_DURATION=10s --env TARGET_VUS=20 --rps 30 --out csv=/results/Build${env.BUILD_NUMBER}.csv --out influxdb=http://influxdb:8086/k6 /framework/main.js --tag testid=Build${env.BUILD_NUMBER}"
                }
            }
        }
        stage('Enviando Mail de Resultados') {
            steps {
                script {
                    sh "docker-compose run --rm -w /nodejs/functions nodejs sendMailPerformance.js ${env.BUILD_NUMBER}"
                }
            }
        }

    }
}