-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: tcc
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
create database tcc;
use tcc;
--
-- Table structure for table `assinatura`
--

DROP TABLE IF EXISTS `assinatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assinatura` (
  `id_assinatura` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `plano` enum('premium','premium_plus') NOT NULL,
  `data_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_fim` timestamp NOT NULL,
  `preço` float NOT NULL,
  PRIMARY KEY (`id_assinatura`),
  KEY `assinatura_ibfk_1_idx` (`id_usuario`),
  CONSTRAINT `assinatura_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assinatura`
--

LOCK TABLES `assinatura` WRITE;
/*!40000 ALTER TABLE `assinatura` DISABLE KEYS */;
INSERT INTO `assinatura` VALUES (1,1,'premium','2025-03-11 14:30:00','2025-04-11 14:30:00',8.99),(2,2,'premium','2025-03-11 16:00:00','2025-04-11 16:00:00',8.99),(3,4,'premium','2025-03-12 10:50:00','2025-04-12 10:50:00',8.99),(4,9,'premium','2025-03-13 23:00:00','2025-04-13 23:00:00',8.99),(5,12,'premium','2025-03-13 20:00:00','2025-04-13 20:00:00',8.99),(6,13,'premium','2025-03-14 12:25:00','2025-04-14 12:25:00',8.99),(7,15,'premium','2025-03-14 15:00:00','2025-04-14 15:00:00',8.99),(8,17,'premium','2025-03-14 21:30:00','2025-04-14 21:30:00',8.99),(9,20,'premium','2025-03-16 18:45:00','2025-04-16 18:45:00',8.99),(10,3,'premium','2025-03-16 19:00:00','2025-04-16 19:00:00',8.99),(11,7,'premium','2025-03-17 17:15:00','2025-04-17 17:15:00',8.99),(12,6,'premium','2025-04-01 02:00:00','2025-05-02 02:00:00',8.99),(13,8,'premium','2025-03-30 21:00:00','2025-04-30 21:00:00',8.99),(14,10,'premium','2025-04-15 22:00:00','2025-05-15 22:00:00',8.99),(15,1,'premium','2025-04-01 19:30:00','2025-05-01 19:30:00',8.99),(16,5,'premium','2025-04-02 16:00:00','2025-05-02 16:00:00',8.99),(17,11,'premium','2025-04-03 20:30:00','2025-05-03 20:30:00',8.99),(18,14,'premium','2025-04-04 14:15:00','2025-05-04 14:15:00',8.99),(19,16,'premium','2025-04-06 00:45:00','2025-05-06 00:45:00',8.99),(20,18,'premium','2025-04-07 02:10:00','2025-05-07 02:10:00',8.99),(21,19,'premium','2025-04-07 13:30:00','2025-05-07 13:30:00',8.99),(22,21,'premium','2025-04-08 18:50:00','2025-05-08 18:50:00',8.99),(23,22,'premium','2025-04-09 22:20:00','2025-05-09 22:20:00',8.99),(24,23,'premium','2025-04-10 15:40:00','2025-05-10 15:40:00',8.99);
/*!40000 ALTER TABLE `assinatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `id_avaliacao` int NOT NULL AUTO_INCREMENT,
  `nota` int DEFAULT NULL,
  `comentario` text,
  PRIMARY KEY (`id_avaliacao`),
  CONSTRAINT `avaliacao_chk_1` CHECK ((`nota` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (1,5,'obrigado, eu estava com duvidas sobre cardinalidade e voce conseguiu tirar elas'),(2,5,'O segundo exercicio eu tive muita duvida na hora de fazer, mas agora conseguir entender, vlw'),(3,5,'puxa, na aula achei que era muito dificil, mas depois que vi seu video percebi o quao facil e, nota 10.'),(4,4,NULL),(5,5,'você explica bem demais, professor top, 5 estrelas!'),(6,5,'pelo seu video consegui entender, muito obrigado.'),(7,4,'obrigado, tenho prova amanhã e tava sem saber da matéria.'),(8,3,NULL),(9,5,'Você explica muito bem professor.'),(10,5,'Obrigado pelo video, meu professor não passou oracle e eu queria aprender mais sobre.'),(11,4,NULL),(12,5,'muito bom o video.'),(13,5,'nossa, mongodb é mais facil que eu imaginei, tu explica muito bem.'),(14,5,NULL),(15,4,'Parabéns, explica muito bem'),(16,5,'nossa, explição top, 5 estrelas.'),(17,5,'meu professor tinha passado uns exercicios q eu não tinha entendido, mas dps de ver seu video ficou facil fazer, vlw.'),(18,4,'quando a minha professora passou listas eu tinha achado muito dificil, mas agora vi q é bem simples.'),(19,4,NULL),(20,5,'só consigo aprender com vídeos, obrigado.'),(21,5,'queria que meu professor explicasse desse jeito, deixou tudo tão claro'),(22,4,NULL),(23,5,'Professora top, explica demais'),(24,4,NULL),(25,5,'Finalmente consegui entender consultas complexas no SQL.'),(26,5,'Explicação sobre chaves estrangeiras ficou muito clara, obrigado.'),(27,3,NULL),(28,5,'Não sabia nada de Vue.js, mas agora já consigo fazer meu primeiro projeto.'),(29,5,'Cara, nunca achei que entenderia recursividade, muito bom!'),(30,4,NULL),(31,5,'Eu estava apanhando para entender Docker, seu vídeo salvou meu projeto.'),(32,5,'Ótima explicação sobre API GraphQL, muito obrigado!'),(33,5,'Consegui fazer meu primeiro CRUD em Laravel, graças ao vídeo.'),(34,4,NULL),(35,5,'Explicação sobre versionamento Git foi excelente, obrigado!'),(36,5,'Eu precisava entender Entity Framework e seu vídeo foi perfeito.'),(37,3,NULL),(38,5,'Que explicação maravilhosa sobre testes automatizados, gostei muito!'),(39,5,'A didática é excelente, parabéns pelo conteúdo.'),(40,4,NULL),(41,5,'Muito bom! Nunca entendi bem regex, agora ficou claro.'),(42,5,'Gostei muito da explicação sobre AWS, ajudou bastante no meu trabalho.'),(43,5,'Aula sobre segurança em aplicações web foi incrível, parabéns.'),(44,3,NULL);
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criador`
--

DROP TABLE IF EXISTS `criador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `criador` (
  `id_criador` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `formacao` text NOT NULL,
  `funcao` enum('1','2') NOT NULL,
  PRIMARY KEY (`id_criador`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criador`
--

LOCK TABLES `criador` WRITE;
/*!40000 ALTER TABLE `criador` DISABLE KEYS */;
INSERT INTO `criador` VALUES (1,'Adecio','adeciobanco@gmail.com','adeciofazsql','123.456.789-01','ciencia de dados','1'),(2,'Rodolfo','rodolfo.bispo@gmail.com','theresameuamor','901.234.567-89','engenharia de software','1'),(3,'Sandra','sandra_espanha@gmail.com','holachicosquetal','123.345.678-90','desenvolvimento web','1'),(4,'Cassio','cassioabel@gmail.com','csml10223005','234.456.789-01','ciencia da computacao','1'),(5,'Elaine','elaine1978@gmail.com','elaine2874617491','345.678.901-23','desenvolvimento mobile','1'),(6,'Joaquim','joaquim.rocha@gmail.com','vitalicioseilauimasenha','789.012.345-67','analise e desenvolvimento de sistemas ','1'),(7,'Francisco','francisco.oliveira@gmail.com','umasenhamuitolouca ','456.789.012-34','administracao de banco de dados','1'),(8,'Giovana','Giovanamaria_flor@gmail.com','giovanamariaflorjj26','678.901.234-56','arquitetura de software','1'),(9,'Regina','regina.santos@gmail.com','todasassenhasjesusamado','567.789.012-34','engenharia da computacao','1'),(10,'Paulo','paulogustavo@gmail.com','4567324632','890.123.456-78','ciencia de dados','1'),(11,'Elisangela','profelisangela@gmail.com','professoraelisangeladeti','716.206.990-87','analise e desenvolvimento de sistemas','1'),(12,'Joel','joeldacomputacao@gmail.com','joelformadoemcomputacao','434.289.500-54','ciencia da computacao','1'),(13,'Vladimir','vladimiroensino@gmail.com','euensinomuitobem','575.418.020-93','desenvolvimento web','1'),(14,'Oscar','oscar.ramalho@gmail.com','7573819475981','729.997.470-39','engenharia de software','1'),(15,'Rosimar','rosimar.gouveia@gmail.com','tenhomuitasenhas','861.653.230-73','administracao de banco de dados','1'),(16,'Maria','maria.silva@gmail.com','senhacomum123','123.987.654-32','engenharia de software','1'),(17,'Carlos','carlos.souza@gmail.com','supersenha789','321.654.987-54','analise de sistemas','2'),(18,'Fernanda','fernanda.mendes@gmail.com','senha123456','654.987.321-00','desenvolvimento de software','1'),(19,'Paula','paula.rodrigues@gmail.com','senhaadmin321','876.543.210-12','arquitetura de sistemas','1'),(20,'João','joao.pereira@gmail.com','senhasecreta234','432.109.876-32','ciencia de dados','1'),(21,'Tatiane','tatiane.oliveira@gmail.com','tatiane@123','765.432.109-76','engenharia de computacao','1'),(22,'Marcos','marcos.santos@gmail.com','senha@marcos2025','234.567.890-56','desenvolvimento mobile','1'),(23,'Roberta','roberta.silveira@gmail.com','senha2023roberta','543.210.987-65','analise de sistemas','1'),(24,'Henrique','henrique.costa@gmail.com','senha123henrique','654.321.098-76','ciencia da computacao','1'),(25,'Ana','ana.carvalho@gmail.com','12345ana','987.654.321-01','desenvolvimento web','1'),(26,'Juliano','juliano.ferreira@gmail.com','senha_juliano','876.543.210-09','engenharia de software','2'),(27,'Lívia','livia.morais@gmail.com','liviamorais@123','765.432.109-87','arquitetura de software','1'),(28,'Gustavo','gustavo.alves@gmail.com','gustavo123','432.109.876-33','ciencia de dados','1'),(29,'Bruna','bruna.santos@gmail.com','senha123bruna','321.654.987-65','desenvolvimento de software','1'),(30,'Eduardo','eduardo.silveira@gmail.com','senhaeduardo2025','234.567.890-45','analise e desenvolvimento de sistemas','1'),(31,'Reinaldo','Reinaldo.professor@gmail.com','reinaldotiinforma','745.145.567-65','administracao de banco de dados','1'),(32,'Benedito','benedito.ensina@gmail.com','beneditosaber','987.654.321-12','ciencia de dados','1'),(33,'Gertrudes','gertrudes.soft@gmail.com','gertrudesprogramadora','876.543.210-23','engenharia de software','1'),(34,'Valdemar','valdemar.web@gmail.com','valdemarcriadorweb','765.432.109-34','desenvolvimento web','1'),(35,'Ernestina','ernestina.comp@gmail.com','ernestinacomputacao','654.321.098-45','ciencia da computacao','1'),(36,'Juvenal','juvenal.mobile@gmail.com','juvenalapp','543.210.987-56','desenvolvimento mobile','1'),(37,'Onofre','onofre.ads@gmail.com','onofreanalista','432.109.876-67','analise e desenvolvimento de sistemas','1'),(38,'Bernardina','bernardina.dba@gmail.com','bernardinadados','321.098.765-78','administracao de banco de dados','1'),(39,'Isidoro','isidoro.arquiteto@gmail.com','isidoroarquitetura','210.987.654-89','arquitetura de software','1'),(40,'Conceição','conceicao.engcomp@gmail.com','conceicaoengenheira','109.876.543-90','engenharia da computacao','1'),(41,'Sebastião','sebastiao.dados@gmail.com','sebastiaociencia','998.776.554-01','ciencia de dados','1'),(42,'Aparecida','aparecida.analise@gmail.com','aparecidaanalista','887.665.443-12','analise e desenvolvimento de sistemas','1'),(43,'Ezequiel','ezequiel.info@gmail.com','ezequielcomputacao','776.554.332-23','ciencia da computacao','1'),(44,'Doroteia','doroteia.desenvolve@gmail.com','doroteiawebdev','665.443.221-34','desenvolvimento web','1'),(45,'Anselmo','anselmo.softeng@gmail.com','anselmosoftware','554.332.210-45','engenharia de software','1'),(46,'Palmira','palmira.banco@gmail.com','palmiradba','443.221.109-56','administracao de banco de dados','1'),(47,'Severino','severino.engenharia@gmail.com','severinoengcomp','332.210.098-67','engenharia da computacao','1'),(48,'Iolanda','iolanda.arquiteta@gmail.com','iolandaarquiteta','221.109.987-78','arquitetura de software','1'),(49,'Osvaldo','osvaldo.analista@gmail.com','osvaldoanalise','110.098.876-89','analise de sistemas','2'),(50,'Romilda','romilda.desenvolve@gmail.com','romildadev','098.876.654-90','desenvolvimento de software','1'),(51,'Teodoro','teodoro.dados@gmail.com','teodorociencia','879.654.321-00','ciencia de dados','1');
/*!40000 ALTER TABLE `criador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id_playlist` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_criador` int DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `visibilidade` enum('publica','privada') NOT NULL,
  PRIMARY KEY (`id_playlist`),
  KEY `playlist_ibfk_1_idx` (`id_usuario`),
  KEY `playlist_ibfk_2_idx` (`id_criador`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (5,1,NULL,'playlist da juliana','privada'),(6,NULL,2,'aulas de python','publica'),(7,3,NULL,'playlist do Ivan','privada'),(8,4,NULL,'playlist da Heloisa','privada'),(9,NULL,5,'aulas de react ','publica'),(10,NULL,1,'aula de banco de dados','publica'),(11,13,NULL,'bancos da ba','privada'),(12,7,NULL,'minha playlist','publica'),(13,17,NULL,'programação','privada'),(14,5,NULL,'playlist de back-end','privada'),(15,6,NULL,'playlist de fundamentos de programação','privada'),(16,7,NULL,'playlist do Marcos','privada'),(17,8,NULL,'playlist de algoritmos','privada'),(18,9,NULL,'playlist de design patterns','privada'),(19,10,NULL,'playlist de SQL avançado','privada'),(20,11,NULL,'playlist de MongoDB','privada'),(21,12,NULL,'playlist de Vue.js','privada'),(22,13,NULL,'playlist de Angular','privada'),(23,14,NULL,'playlist de C#','privada'),(24,15,NULL,'playlist de Flutter','privada'),(25,NULL,1,'aulas de JavaScript','publica'),(26,NULL,2,'aulas de Ruby','publica'),(27,NULL,3,'aulas de PHP','publica'),(28,NULL,4,'aulas de TypeScript','publica'),(29,NULL,5,'aulas de banco de dados','publica'),(30,NULL,6,'aulas de Docker','publica'),(31,NULL,7,'aulas de Git','publica'),(32,NULL,8,'aulas de API REST','publica'),(33,NULL,9,'aulas de arquitetura de software','publica');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_video`
--

DROP TABLE IF EXISTS `playlist_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_video` (
  `id_playlistvideo` int NOT NULL AUTO_INCREMENT,
  `id_playlist` int NOT NULL,
  `id_video` int NOT NULL,
  `data_adicao` date NOT NULL,
  `posicao_video` int NOT NULL,
  PRIMARY KEY (`id_playlistvideo`),
  KEY `fk_playlist_idx` (`id_playlist`),
  KEY `fk_video_idx` (`id_video`),
  CONSTRAINT `fk_playlist` FOREIGN KEY (`id_playlist`) REFERENCES `playlist` (`id_playlist`),
  CONSTRAINT `fk_video` FOREIGN KEY (`id_video`) REFERENCES `video` (`id_video`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_video`
--

LOCK TABLES `playlist_video` WRITE;
/*!40000 ALTER TABLE `playlist_video` DISABLE KEYS */;
INSERT INTO `playlist_video` VALUES (1,5,1,'2025-03-11',1),(2,5,2,'2025-03-11',2),(3,5,3,'2025-03-12',3),(4,6,1,'2025-03-12',1),(5,6,2,'2025-03-13',2),(6,6,4,'2025-03-13',3),(7,7,1,'2025-03-14',1),(8,7,3,'2025-03-14',2),(9,8,4,'2025-03-15',1),(10,8,3,'2025-03-15',2),(11,8,1,'2025-03-15',3),(12,9,2,'2025-03-16',1),(13,9,1,'2025-03-16',2),(14,9,3,'2025-03-16',3),(15,10,1,'2025-03-17',1),(16,10,2,'2025-03-17',2),(17,10,3,'2025-03-17',3),(18,10,4,'2025-03-17',4),(19,11,1,'2025-03-17',1),(20,11,7,'2025-03-17',2),(21,11,10,'2025-03-17',3),(22,11,14,'2025-03-17',4),(23,11,15,'2025-03-18',5),(24,12,12,'2025-03-18',1),(25,12,5,'2025-03-18',2),(26,13,6,'2025-03-18',1),(27,13,9,'2025-03-18',2),(28,14,14,'2025-03-21',1),(29,14,15,'2025-03-21',2),(30,14,16,'2025-03-21',3),(31,15,17,'2025-03-22',1),(32,15,18,'2025-03-22',2),(33,15,19,'2025-03-22',3),(34,16,20,'2025-03-23',1),(35,16,21,'2025-03-23',2),(36,16,22,'2025-03-23',3),(37,17,23,'2025-03-24',1),(38,17,24,'2025-03-24',2),(39,17,25,'2025-03-24',3),(40,18,26,'2025-03-25',1),(41,18,27,'2025-03-25',2),(42,18,28,'2025-03-25',3),(43,19,29,'2025-03-26',1),(44,19,30,'2025-03-26',2),(45,20,1,'2025-03-27',1),(46,20,2,'2025-03-27',2),(47,20,3,'2025-03-27',3),(48,21,4,'2025-03-28',1),(49,21,5,'2025-03-28',2),(50,21,6,'2025-03-28',3),(51,22,7,'2025-03-29',1),(52,22,8,'2025-03-29',2),(53,22,9,'2025-03-29',3),(54,23,10,'2025-03-30',1),(55,23,11,'2025-03-30',2),(56,23,12,'2025-03-30',3),(57,24,13,'2025-03-31',1),(58,24,14,'2025-03-31',2),(59,24,15,'2025-03-31',3);
/*!40000 ALTER TABLE `playlist_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `interesses` varchar(255) NOT NULL,
  `pergunta_resposta` varchar(100) NOT NULL,
  `funcao` enum('0','1','2') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juliana','jujubastos06@gmail.com','amominhamae2006','python, portugol, java','Escola Jardim das Flores','0'),(2,'Gabriel','gabsferreira@gmail.com','31012007','php, javascript','Rex','0'),(3,'Ivan','ivan_belario@gmail.com','ivfutebol@','typescript, java, javascript','São Paulo','0'),(4,'Heloísa','helonunes_19@gmail.com','hntvlpostag','mysql, mongodb, oracle','Rua das Palmeiras','0'),(5,'Maria','maria.oliveira@gmail.com','456123987','java, php','Lasanha','0'),(6,'Lucas','lucas.souza@gmail.com','789653413','C++, ruby','Vingadores','0'),(7,'Bruno','bruno.martins@gmail.com','48237589372','kotlin, java, javascript','Colégio Estrela do Norte','0'),(8,'Rodrigo','rodlima.01@gmail.com','5738736347185','react, java','Thor','0'),(9,'Thiago','titigas_4910@gmail.com','titigasloverock','mysql, oracle','Rio de Janeiro','0'),(10,'Camila','camis_viera@gmail.com','araciosvaldokellycamila','html, css, java','Avenida Brasil','0'),(11,'Jonas','jonas103452@gmail.com','14356335631','python, php','Pizza','0'),(12,'Carla','carlinhabale@gmail.com','dancaevidas2','javascript, java, react, css','Harry Potter','0'),(13,'Barbara','barezeil.lima@gmail.com','slalesbiana','mysql, mongodb, oracle','Escola Vida Nova','0'),(14,'Bruno','brunotava@gmail.com','essasenhatoperson','javascript, php','Bob','0'),(15,'Renato','renatolyra@gmail.com','shirtlessrenato@34','kotlin, java, python, php','Belo Horizonte','0'),(16,'Donatella','donatellaversace@gmai.com','elaericademais426','html, css, react','Rua das Laranjeiras','0'),(17,'Evandro','evandrodj@gmail.com','284756352musica','C++, php','Feijoada','0'),(18,'Fernando','fernand0_4168@gmail.com','f3rn4nd0arribameo','groovy, kotlin, java','Jurassic Park','0'),(19,'Rafael','rafinha5642@gmail.com','alunodafiec37485','react, css','Escola Nova Geração','0'),(20,'Thalita','thalita_35@gmail.com','friendlycompetition','java, javascript','Nina','0'),(21,'Natan','natan7831@gmail.com','ticriticam59482','typescript, javascript','Salvador','0'),(22,'Gustavo','gustavokido@gmail.com','muitacriatividadeveyr','mysql, oracle','Rua das Flores','0'),(23,'Paola','paola.tidinha@gmail.com','batatinhabemquentinha','kotlin, javascript','Sushi','0'),(24,'Hemilio','hemili2047@gmail.com','espaguetegostosinho','python, portugol','Star Wars','0'),(25,'Murilo ','murilosantanna@gmail.com','acabecomela','python, laravel','Escola Santo Antônio','2'),(26,'Adriana ','adrianaImai23@gmail.com','amaiordodbd','oracle, postgresql','Mel','0'),(27,'Diogo','diogo9865@gmail.com','esssasenhagenerica','java, javascript','Curitiba','0'),(28,'Ulisses','ulio.isses@gmail.com','ulisses6683251','php, python, C++','Rua do Comércio','0'),(29,'Calebe','calebe.lamaro@gmail.com','5421235886554','html, react, node.js','Hambúrguer','0'),(30,'Taynara','taynara2007@gmail.com','taynara584284957','ruby, scala','Titanic','0'),(31,'Omar','omar.camargo@gmail.com','senhasomar','kotlin, typescript','Escola Horizonte','0'),(32,'Bianca','bianca.roma@gmail.com','essasenha53315','mysql, postgresql','Luna','0'),(33,'Matheus','matheuskastro02gmail.com','muitaspessoasexistem','java, php','Manaus','0'),(34,'Oliver','Olivergringo@gmail.com','oimate39475284','flutter, react','Rua da Paz','0'),(35,'Danilo','danilo653@gmail.com','dalinosenhasahaha','python, C++','Strogonoff','0'),(36,'Eduardo ','edu85628@gmail.com','eduedududu','laravel, javascript','Matrix','0'),(37,'Ronaldo','ronnievaldo@gmail.com','6452856ronaldo','mysql, oracle','Colégio São Luiz','0'),(38,'Rayane','rayane.luara@gmail.com','sabrinacarpenter','python, php','Simba','0'),(39,'Gabriella','gabi3103@gmail.com','shadowofaman','javascript, mongodb','Recife','0'),(40,'Fabrício','fabs5628@gmail.com','fabricioanjos','ruby, C++','Rua Nova Esperança','0'),(41,'Manuella','amanu.bts@gmail.com','jiminjungkook','react, css, java','Nhoque','0'),(42,'Samuel','samuelalves@gmail.com','samucabiruta','kotlin, scala','O Senhor dos Anéis','0'),(43,'Thales','thales_3855@gmail.com','tha93754638','typescript, java','Escola Modelo','0'),(44,'Alessandra','ale.sandra@gmail.com','alessandra123','java, javascript','Doctor Who','0'),(45,'Ricardo','ricardo.dev@gmail.com','ricardoprograma','python, php','Campinas','0'),(46,'Patrícia','pati.info@gmail.com','patriciaweb','html, css, javascript','Pipoca','0'),(47,'Marcelo','marcelo.ti@gmail.com','marcelotecno','C++, python','Colégio Taquaral','0'),(48,'Fernanda','fernanda.dados@gmail.com','fernandadb','mysql, oracle','Salada','0'),(49,'Leonardo','leo.mobile@gmail.com','leonardomobile','react, java','Jogos Vorazes','0'),(50,'Amanda','amanda.cloud@gmail.com','amandacloud','python, php','Elias Fausto','0'),(51,'Gustavo','guga.ia@gmail.com','gustavoai','python, java','Sorvete','0'),(52,'Isabela','isa.frontend@gmail.com','isabelafront','react, javascript','Bridgerton','0'),(53,'Vinícius','vini.seguranca@gmail.com','viniciussecurity','java, php','Escola Araci Medeiros','0'),(54,'Letícia','le.analista@gmail.com','leticiaanalise','mysql, mongodb','Avenida Salvador Cruzeiro','0'),(55,'Sérgio','sergio.redes@gmail.com','sergiorede','C++, ruby','Brigadeiro','2'),(56,'Natália','nati.uxui@gmail.com','nataliaux','html, css','Pânico','0'),(57,'André','andre.devops@gmail.com','andrevops','java, javascript','Salto','0'),(58,'Julie','juli.testes@gmail.com','julitestes','python, portugol','Hôrtolandia','0'),(59,'Felipe','felipe.games@gmail.com','felipejogos','C++, php','LOL','0'),(60,'Mariana','mari.mobiledev@gmail.com','marianamobile','kotlin, java','Escona Nação Unida','0'),(61,'Thiago','thiago.iot@gmail.com','thiagoiot','typescript, javascript','Macarronada','0'),(62,'Camila','cami.suporte@gmail.com','camilasuporte','mysql, oracle','Rua Agatha Ramos','0'),(63,'Eduardo','edu.inteligencia@gmail.com','eduardoia','react, css','Jujuca','0');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_avaliacao`
--

DROP TABLE IF EXISTS `usuario_avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_avaliacao` (
  `sóprabotadado` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_video` int NOT NULL,
  `id_avaliacao` int NOT NULL,
  `data_inicio` datetime NOT NULL,
  `tempo_assistido` time NOT NULL,
  PRIMARY KEY (`sóprabotadado`),
  KEY `fk_usuario_id_usuario_idx` (`id_usuario`),
  KEY `fk_video_id_video_idx` (`id_video`),
  KEY `fk_avaliacao_avaliacao_idx` (`id_avaliacao`),
  CONSTRAINT `fk_avaliacao_avaliacao` FOREIGN KEY (`id_avaliacao`) REFERENCES `avaliacao` (`id_avaliacao`),
  CONSTRAINT `fk_usuario_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `fk_video_id_video` FOREIGN KEY (`id_video`) REFERENCES `video` (`id_video`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_avaliacao`
--

LOCK TABLES `usuario_avaliacao` WRITE;
/*!40000 ALTER TABLE `usuario_avaliacao` DISABLE KEYS */;
INSERT INTO `usuario_avaliacao` VALUES (1,1,1,1,'2025-03-11 13:30:23','00:21:47'),(2,2,3,2,'2025-03-11 14:07:12','00:17:57'),(3,3,3,3,'2025-03-11 14:20:12','00:17:57'),(4,4,4,4,'2025-03-11 15:02:52','00:19:21'),(5,5,4,5,'2025-03-11 15:47:14','00:19:21'),(6,6,5,6,'2025-03-11 16:12:46','00:22:21'),(7,9,6,7,'2025-03-11 16:30:00','00:28:15'),(8,14,7,8,'2025-03-11 17:05:42','00:15:59'),(9,17,7,9,'2025-03-11 17:40:10','00:15:59'),(10,13,10,10,'2025-03-11 18:12:25','00:22:30'),(11,22,10,11,'2025-03-11 18:45:00','00:22:30'),(12,21,8,12,'2025-03-12 08:30:00','00:17:51'),(13,23,7,13,'2025-03-12 09:45:00','00:15:59'),(14,4,2,14,'2025-03-12 10:02:24','00:26:41'),(15,18,12,15,'2025-03-12 10:15:21','00:24:13'),(16,11,13,16,'2025-03-12 10:17:44','00:19:59'),(17,17,9,17,'2025-03-12 10:30:31','00:16:43'),(18,15,2,18,'2025-03-12 11:05:02','00:26:41'),(19,13,1,19,'2025-03-12 11:07:52','00:21:47'),(20,24,11,20,'2025-03-12 11:21:30','00:15:42'),(21,20,14,21,'2025-03-12 11:30:31','00:23:52'),(22,13,14,22,'2025-03-12 11:32:51','00:23:52'),(23,4,15,23,'2025-03-12 12:16:25','00:28:31'),(24,24,15,24,'2025-03-12 14:30:00','00:26:05'),(25,1,16,25,'2025-03-12 15:00:30','00:22:20'),(26,2,17,26,'2025-03-12 15:30:45','00:21:55'),(27,3,18,27,'2025-03-12 16:00:10','00:23:15'),(28,4,19,28,'2025-03-12 16:30:00','00:20:25'),(29,5,20,29,'2025-03-12 17:00:20','00:22:30'),(30,6,21,30,'2025-03-12 17:30:40','00:25:40'),(31,7,22,25,'2025-03-12 18:00:15','00:22:00'),(32,8,23,26,'2025-03-12 18:30:25','00:21:40'),(33,9,24,27,'2025-03-12 19:00:30','00:23:10'),(34,10,25,28,'2025-03-12 19:30:45','00:24:05'),(35,11,26,29,'2025-03-12 20:00:10','00:25:00'),(36,12,27,30,'2025-03-12 20:30:25','00:22:50'),(37,13,28,25,'2025-03-12 21:00:00','00:20:40'),(38,14,29,26,'2025-03-12 21:30:15','00:21:30'),(39,15,30,27,'2025-03-12 22:00:30','00:22:20');
/*!40000 ALTER TABLE `usuario_avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id_video` int NOT NULL AUTO_INCREMENT,
  `id_criador` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `url` varchar(500) NOT NULL,
  `data_publicacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categoria` varchar(100) NOT NULL,
  `palavra_chave` varchar(100) NOT NULL,
  PRIMARY KEY (`id_video`),
  KEY `video_ibfk_1_idx` (`id_criador`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`id_criador`) REFERENCES `criador` (`id_criador`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,1,'APRENDENDO A FAZER MODELOS CONCEITUAIS','Nesse video, ensino como funciona um modelo conceitual e como criar ele','https://www.youtube.com/watch?v=BzQ7kkTZVIo','2025-03-10 12:12:42','banco de dados','conceitual'),(2,2,'PYTHON LISTAS. RESOLVENDO EXERCÍCIOS','Nesse video, estou resolvendo os exercicios que passei no final do video de semana passada, onde vimos um pouco sobre listas no python','https://www.youtube.com/watch?v=ZFAOxCyC4tU&list=PLNyCgqr3-6Amx5T15bW-7k70wtzk9ZK16&index=3','2025-03-10 12:42:18','programação','python'),(3,3,'HTML E CSS, APRENDA DO INÍCIO.','Nesse video, voce aprendera a comecar um projeto html e css.','https://www.youtube.com/watch?v=n_Etdr7Dbjs','2025-03-10 13:55:21','programação','html'),(4,4,'APRENDA O ESSENCIAL DE SEGURANÇA DA INFORMAÇÃO','Nesse video, aprenderemos quais sao os conceitos, fundamento e mecanismos de seguranca da informacao','https://www.youtube.com/watch?v=Gfh2bxe3hGU&pp=ygUac2VndXJhbsOnYSBkYSBpbmZvcm1hw6fDo28%3D','2025-03-10 14:06:41','ciencia da computação','segurança'),(5,5,'REACT NO MOBILE, APRENDA DESDE O INÍCIO.','Nesse video, veremos as funcionalidades do react no mobile e como ele se diferencia do react para html.','https://www.youtube.com/watch?v=71shcOjC_a4&pp=ygUMcmVhY3QgbW9iaWxl','2025-03-10 15:12:42','programação','react'),(6,6,'O BÁSICO DE C++, VEJA AQUI.','Nesse video, ensino basico de c++ para iniciantes e no final do video, resolvo um exercicio.','https://www.youtube.com/watch?v=McbdxZ3Se2U&pp=ygUKYysrIGJhc2ljbw%3D%3D','2025-03-10 16:00:30','programação','c++'),(7,7,'CRIANDO UM PROJETO NO MONGODB.','Nesse video, ensino a criar um banco de dados no mongodb.','https://www.youtube.com/watch?v=4dTI1mVLX3I&pp=ygUIbW9uZ28gZGI%3D','2025-03-10 17:15:00','banco de dados','mongodb'),(8,8,'COMO ESTRUTURAR UM PROJETO.','Nesse video, aprendemos a melhor forma de estruturar um projeto de programação.','https://www.youtube.com/watch?v=tbtQnKRttL8&pp=ygUqY29tbyBlc3RydXR1cmFyIHVtIHByb2pldG8gZGUgcHJvZ3JhbWHDp2Fv','2025-03-10 18:05:00','estrutura de software','projeto'),(9,9,'PHP, AULA 1.','Nesse video, ensino por meio de exercicios o basico de php.','https://www.youtube.com/watch?v=YCXtaBXgP5A&pp=ygUEcGhwINIHCQm9AIO1pN6f1A%3D%3D','2025-03-10 19:25:00','programação','php'),(10,10,'ORACLE, COMO FUNCIONA.','Nesse video, conhecemos o básico do oracle e o porque dele ser um banco de dados muito utilizado no mercado.','https://www.youtube.com/watch?v=DEDPnjh4E6s&list=PLJZRlbWeQvwI8nRzviH5ckXwYudrw2T56&index=4','2025-03-10 19:30:00','banco de dados','oracle'),(11,11,'PORTUGOL, O BÁSICO DA PROGRAMAÇÃO','Nesse video, aprenderemos o básico da programação, o portugol.','https://www.youtube.com/watch?v=jndzJGPlgrc&list=PLEFQxmyNTPkGcP-PVIDZAOP3bxAa0_caE','2025-03-10 19:45:00','programação','portugol'),(12,12,'JAVASCRIPT, COMO CRIAR UM PROJETO DE BACK END.','Nesse video, ensino como funciona o back end e sua programação.','https://www.youtube.com/watch?v=YeEX1s4M9xg','2025-03-10 20:00:30','programação','javascript'),(13,13,'COMO USAR CSS COM REACT.','Nesse video, ensino como implementar css no react.','https://www.youtube.com/watch?v=20hlPRPVMoU','2025-03-10 20:15:00','programação','css'),(14,14,'NOSQL, CONCEITOS E FUNCIONALIDADES','Nesse video, vemos as diferenças do mysql do nosql.','https://www.youtube.com/watch?v=1B64oqE8PLs','2025-03-11 12:30:00','banco de dados','nosql'),(15,15,'POSTGRESQL, CRIANDO UM BANCO DO ZERO.','Nesse video, ensino como trabalhar com o PostgreSQL.','https://www.youtube.com/watch?v=Ft3F7wWA-x8&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY&index=6','2025-03-11 13:15:00','banco de dados','postgresql'),(16,16,'APRENDENDO JAVA DO ZERO','Neste vídeo, ensino o básico do Java e como configurar o ambiente de desenvolvimento.','https://www.youtube.com/watch?v=QEvFjbsXvZo','2025-03-11 17:00:00','programação','java'),(17,17,'INICIANDO COM FLUTTER','Neste vídeo, abordo os primeiros passos para criar aplicativos com Flutter.','https://www.youtube.com/watch?v=1GT0jVxVgSg','2025-03-11 17:30:00','programação','flutter'),(18,18,'APRENDENDO REACT NATIVE','Neste vídeo, ensino a usar React Native para criar aplicativos móveis.','https://www.youtube.com/watch?v=2Mrd7qXIzsE','2025-03-11 18:00:00','programação','react native'),(19,19,'COMO FUNCIONA O GIT','Neste vídeo, explico o funcionamento básico do Git e como utilizá-lo em projetos.','https://www.youtube.com/watch?v=DR2JMbUn6xw','2025-03-11 18:30:00','programação','git'),(20,20,'APRENDENDO SQL BÁSICO','Neste vídeo, ensino o básico sobre SQL e como fazer consultas simples em um banco de dados.','https://www.youtube.com/watch?v=4P9H6OL63Uk','2025-03-11 19:00:00','banco de dados','sql'),(21,21,'TUTORIAL DE POO EM JAVA','Neste vídeo, ensino os conceitos básicos de Programação Orientada a Objetos em Java.','https://www.youtube.com/watch?v=32pZfBQWqLk','2025-03-11 19:30:00','programação','poo, java'),(22,22,'DIFERENÇA ENTRE MYSQL E POSTGRESQL','Neste vídeo, comparo os dois bancos de dados relacionais mais populares, MySQL e PostgreSQL.','https://www.youtube.com/watch?v=UFi0Ul5Zt-k','2025-03-11 20:00:00','banco de dados','mysql, postgresql'),(23,23,'CRIE SEU PRIMEIRO PROJETO EM LARAVEL','Neste vídeo, ensino como iniciar um projeto com o framework Laravel.','https://www.youtube.com/watch?v=gfh3hYzX_4s','2025-03-11 20:30:00','programação','laravel'),(24,24,'CONSTRUINDO UM CRONÔMETRO EM JAVASCRIPT','Neste vídeo, ensino como criar um cronômetro simples com JavaScript.','https://www.youtube.com/watch?v=pPjaHLPoCPk','2025-03-11 21:00:00','programação','javascript, cronômetro'),(25,25,'COMO CRIAR APPS NO ANDROID','Neste vídeo, ensino como criar um aplicativo simples para Android usando Java.','https://www.youtube.com/watch?v=h9JdkWREZ8E','2025-03-11 21:30:00','programação','android, java'),(26,26,'COMO FUNCIONA O VUE.JS','Neste vídeo, explico como o Vue.js pode facilitar o desenvolvimento de front-end.','https://www.youtube.com/watch?v=nz98Cm8K9Gs','2025-03-11 22:00:00','programação','vue.js'),(27,27,'DESENVOLVENDO UMA API COM NODE.JS','Neste vídeo, ensino como criar uma API utilizando o Node.js e Express.','https://www.youtube.com/watch?v=c5hhmPpOtM8','2025-03-11 22:30:00','programação','node.js, express'),(28,28,'PRINCÍPIOS DE DESIGN DE SOFTWARE','Neste vídeo, ensino os principais princípios de design de software que todo desenvolvedor deve conhecer.','https://www.youtube.com/watch?v=V9jICcT1u5o','2025-03-11 23:00:00','estrutura de software','design de software'),(29,29,'USANDO O FRAMEWORK ANGULAR','Neste vídeo, explico como trabalhar com o framework Angular para criar aplicações dinâmicas.','https://www.youtube.com/watch?v=knZ1ks1NlsE','2025-03-11 23:30:00','programação','angular'),(30,30,'AUTOMAÇÃO DE TESTES COM SELENIUM','Neste vídeo, ensino como automatizar testes de aplicativos web utilizando o Selenium.','https://www.youtube.com/watch?v=AoBYGZerf8k','2025-03-12 00:00:00','programação','selenium');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20 19:19:56
