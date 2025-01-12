import { Client } from '@notionhq/client';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { markdownToBlocks } from '@tryfabric/martian';

const BLOCK_ID = process.env.BLOCK_ID;
const FILE_PATH = process.env.FILE_PATH;
const TOKEN = process.env.TOKEN;


console.log("tst")
console.log(`${process.env.BLOCK_ID}`)
console.log(`${process.env.FILE_PATH}`)
console.log('${process.env.TOKEN}')
