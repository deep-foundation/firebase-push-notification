import * as TJS from 'typescript-json-schema';
import * as path from 'path'
import * as fs from 'fs'
import _ from 'lodash';
import {deepMapObject} from '@freephoenix888/deep-map-object';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { program } from 'commander';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);


main()

async function main () {
  const parsedArguments = await parseArguments();
  const settings: TJS.PartialArgs = {
    required: true,
    titles: true
  };
  
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: false,
    skipLibCheck: true
  };
  
  const definitionFilePath = require.resolve(parsedArguments.interfaceFilePath);
  
  const program = TJS.getProgramFromFiles([definitionFilePath], compilerOptions);
  
  let schema = TJS.generateSchema(program, parsedArguments.interfaceName, settings); 
  if(!schema) {
    throw new Error("Failed to generate schema")
  }
  
  schema = await deepMapObject(schema, ({key, value}) => ({newKey: key, newValue: (key === 'title') ? _.upperFirst(value) : value}));
  fs.writeFileSync(path.resolve(parsedArguments.outputJsonFilePath), JSON.stringify(schema, null, 2));
}

async function parseArguments(): Promise<{interfaceFilePath: string, interfaceName: string, outputJsonFilePath: string}> {
   program
     .requiredOption('--interface-file-path <path>', 'File path to the interface file which will be passed to require.resolve. For example @capacitor/action-sheet/dist/esm/definitions.d.ts')
     .requiredOption('--interface-name <name>', 'Interface name')
     .requiredOption('--output-json-file-path <path>', 'Output json file path')
     .parse(process.argv);
 
   const options = program.opts();
 
   return {
     interfaceFilePath: options.interfaceFilePath,
     interfaceName: options.interfaceName,
     outputJsonFilePath: options.outputJsonFilePath
   };
 }


