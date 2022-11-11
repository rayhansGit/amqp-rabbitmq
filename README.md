# amqp-rabbitmq
docker --version
Docker version 20.10.17, build 100c701

docker-compose --version
Docker Compose version v2.10.2

The main advantage of topic based communication will be, showing some important messages realtime to application users. There might be some messages which are really
urgent to provide. This topic based system can send the message to user right away. Otherwise, it can be also a good protocol to queue the messages and show that when
the user becomes active again.

Through this project, I learnt how to setup docker containers. How it setup the networks between the containers and how containers can share volume with each other.
The most interesting thing I learnt and felt challending was, the caching of docker build. I was changing the contents and was using the command docker-compose up.
But the system was not using that changed code rather it was taking the cached image built before. I struggled to find out this part but this was a great learning indeed.
Otherwise, I also learnt about the timing to arrange the dependend containers about which one will run before and which one will after.
