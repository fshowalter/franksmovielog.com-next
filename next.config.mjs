import  {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin';
import  withExportImages from "next-export-optimize-images"

const withVanillaExtract = createVanillaExtractPlugin();

const config = await withExportImages({
    output: 'dist',
    // write your next.js configuration values.

    output: 'export',
 
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    trailingSlash: true,
   
    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,
   
    // Optional: Change the output directory `out` -> `dist`
    distDir: 'dist',
  })

export default withVanillaExtract(config);
