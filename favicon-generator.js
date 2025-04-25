import generateFaviconPkg from '@realfavicongenerator/generate-favicon';
import imageAdapterPkg from '@realfavicongenerator/image-adapter-node';
import fs from 'fs/promises';
import path from 'path';

const { generateFaviconFiles } = generateFaviconPkg;
const { getNodeImageAdapter, loadAndConvertToSvg } = imageAdapterPkg;

async function generateFavicons() {
  try {
    const imageAdapter = await getNodeImageAdapter();

    const masterIcon = {
      icon: await loadAndConvertToSvg('source/favicon/favicon.svg'),
    };

    const faviconSettings = {
      icon: {
        desktop: {
          regularIconTransformation: {
            type: 'None',
          },
          darkIconType: 'none',
        },
        touch: {
          transformation: {
            type: 'None',
          },
          appTitle: null
        },
        webAppManifest: {
          transformation: {
            type: 'None',
          },
          backgroundColor: '#ffffff',
          themeColor: '#ffffff',
          name: 'Template Vite',
          shortName: 'Template',
          display: 'standalone',
          orientation: 'portrait'
        }
      },
      path: '/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '14%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: true,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            name: 'Template Vite',
            display: 'standalone',
            orientation: 'portrait'
          }
        }
      }
    };

    const files = await generateFaviconFiles(masterIcon, faviconSettings, imageAdapter);

    await fs.mkdir('source/public', { recursive: true });
    await fs.mkdir('source/favicon', { recursive: true });

    for (const [filename, content] of Object.entries(files)) {
      try {
        const targetPath = filename === 'favicon.ico'
          ? path.join('source', 'public', filename)
          : path.join('source', 'favicon', filename);

        await fs.writeFile(targetPath, content, 'binary');

        // eslint-disable-next-line no-console
        console.log(`Файл ${filename} успешно создан`);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Ошибка при создании файла ${filename}:`, err);
      }
    }

    // eslint-disable-next-line no-console
    console.log('Фавиконки успешно сгенерированы!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при генерации фавиконок:', error);
  }
}

generateFavicons();
