import chalk from 'chalk';
import { Command } from 'commander';
export * from 'commander';
export { chalk };
export declare const commandRunner: (name: string) => (options: any) => Promise<void>;
export declare const program: Command;
