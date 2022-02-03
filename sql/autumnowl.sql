DROP TABLE IF EXISTS projectOrder;
DROP TABLE IF EXISTS required;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS material;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    userId              BINARY(16)  NOT NULL,
    userActivationToken CHAR(32),
    userEmail           VARCHAR(32) NOT NULL,
    userHash            CHAR(97)    NOT NULL,
    UNIQUE (userEmail),
    INDEX (userEmail),
    PRIMARY KEY (userID)
);

CREATE TABLE customer
(
    customerId        BINARY(16)   NOT NULL,
    customerAddress   VARCHAR(128) NOT NULL,
    customerNameFirst VARCHAR(32)  NOT NULL,
    customerNameLast  VARCHAR(32)  NOT NULL,
    customerPhone     VARCHAR(10)  NOT NULL,
    customerEmail     VARCHAR(32)  NOT NULL,
    UNIQUE (customerEmail),
    INDEX (customerEmail),
    PRIMARY KEY (customerId)
);

CREATE TABLE project
(
    projectId         BINARY(16)    NOT NULL,
    projectComplexity DECIMAL(6, 2) NOT NULL,
    projectHours      VARCHAR(32)   NOT NULL,
    projectType       VARCHAR(32)   NOT NULL,
    PRIMARY KEY (projectId)
);

CREATE TABLE material
(
    materialId          BINARY(16)  NOT NULL,
    materialName        VARCHAR(64) NOT NULL,
    materialAmount      VARCHAR(32) NOT NULL,
    materialCost        VARCHAR(32),
    materialDescription VARCHAR(1024),
    PRIMARY KEY (materialId)
);

# Link many projects to one customer
# Tracks income
CREATE TABLE transaction
(
    transactionId          BINARY(16)   NOT NULL,
    transactionCustomerId  BINARY(16)   NOT NULL,
    transactionAddress     VARCHAR(128) NOT NULL,
    transactionDateDue     DATETIME(6)  NOT NULL,
    transactionDateOrdered DATETIME(6)  NOT NULL,
    transactionDateShipped DATETIME(6)  NOT NULL,
    transactionPrice       VARCHAR(16)  NOT NULL,
    FOREIGN KEY (transactionCustomerId) REFERENCES customer (customerId),
    PRIMARY KEY (transactionId)
);

# Link many material to one project
CREATE TABLE required
(
    requiredProjectId  BINARY(16) NOT NULL,
    requiredMaterialId BINARY(16) NOT NULL,
    FOREIGN KEY (requiredProjectId) REFERENCES project (projectId),
    FOREIGN KEY (requiredMaterialId) REFERENCES material (materialId),
    PRIMARY KEY (requiredProjectId, requiredMaterialId)
);

# Link many projects to one order
CREATE TABLE projectOrder
(
    projectOrderProjectId     BINARY(16)  NOT NULL,
    projectOrderTransactionId BINARY(16)  NOT NULL,
    projectOrderQuantity      VARCHAR(16) NOT NULL,
    FOREIGN KEY (projectOrderProjectId) REFERENCES project (projectId),
    FOREIGN KEY (projectOrderTransactionId) REFERENCES transaction (transactionId),
    PRIMARY KEY (projectOrderProjectId, projectOrderTransactionId)
);



