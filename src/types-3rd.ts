import bodyParser from 'body-parser';
import express from 'express';
import pino from 'pino';
import mongo from 'mongodb';

export type BodyParser = typeof bodyParser;
export type Express = typeof express;
export type Pino = typeof pino;
export type MongoModule = typeof mongo;
