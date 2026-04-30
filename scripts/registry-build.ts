import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import pkg from "../package.json";
import components from "../components.json";
import { generateShadcnRegistry } from "shadcn-vue-registry";
import { x } from "tinyexec";

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const cwd = resolve(__dirname, "../");
  const registryPath = resolve(cwd, "./app/registry");
  const outputPath = resolve(cwd, "./public/r/");
  const config = {
    root: cwd,
    name: pkg.name,
    homepage: "https://ui.stackhacker.io",
    registries: components.registries,
    cwd: registryPath,
    output: registryPath,
  };

  const registryJson = await generateShadcnRegistry(config);

  const registryJsonPath = resolve(registryPath, "registry.json");
  await mkdir(dirname(registryJsonPath), { recursive: true });
  await writeFile(registryJsonPath, JSON.stringify(registryJson, null, 2));
  console.log(`✓ Registry JSON saved to: ${registryJsonPath}`);

  await mkdir(outputPath, { recursive: true });
  console.log(`✓ Output directory created: ${outputPath}`);

  await x("shadcn-vue", ["build", "-c", registryPath, "-o", outputPath], {
    nodeOptions: {
      cwd,
      shell: true,
    },
  });

  await unlink(registryJsonPath);

  console.log("\n✓ Registry build complete");
  console.log("Registry files available at:\n  /r/registry.json\n  /r/{name}.json");
})();
