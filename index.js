import { readFile } from 'fs';
import handleFileRead from './filehandler.js';

const PATH = process.argv[2];

readFile(PATH, 'utf8', handleFileRead);
