import { Client } from '@notionhq/client';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { markdownToBlocks } from '@tryfabric/martian';

const Block_ID = process.env.BLOCK_ID;
const FILE_Path = process.env.FILE_PATH;
const TOKEN = process.env.TOKEN;


console.log("test")
console.log(Block_ID)
console.log(FILE_Path)
console.log(Token)
