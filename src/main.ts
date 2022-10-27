import path from "path";
import inquirer from "inquirer";
import yargs from "yargs";
// @ts-ignore
import download from "download-git-repo";
import chalk from "chalk";
import ora from "ora";

async function main() {
  const { _ } = await yargs.argv;
  const [dirPath = ".", projectName = ""] = _ as string[];
  const targetPath = path.join(process.cwd(), dirPath, projectName);

  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Please select a template",
      choices: [{ name: "vite-react-mobile", value: "template-vite-react" }],
    },
  ]);

  const start = ora().start("downloading \n");

  download("github:web-liuyang/" + template, targetPath, { clone: false }, (err: Error) => {
    if (err) {
      start.stop();
      throw err;
    }
    start.succeed(chalk.green("download completes"));
    console.log(err);
  });
}

main();
