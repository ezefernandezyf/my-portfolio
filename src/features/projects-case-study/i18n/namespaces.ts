import enCineLab from '../../../locales/en/cinelabcasestudy.json';
import esCineLab from '../../../locales/es/cinelabcasestudy.json';
import enMovieDashboard from '../../../locales/en/moviedashboardcasestudy.json';
import esMovieDashboard from '../../../locales/es/moviedashboardcasestudy.json';
import enChefcitoIA from '../../../locales/en/chefcitoiacasestudy.json';
import esChefcitoIA from '../../../locales/es/chefcitoiacasestudy.json';
import enNexusTalent from '../../../locales/en/nexustalentcasestudy.json';
import esNexusTalent from '../../../locales/es/nexustalentcasestudy.json';
import enEchoLog from '../../../locales/en/echologcasestudy.json';
import esEchoLog from '../../../locales/es/echologcasestudy.json';

export const caseStudyResources = {
  en: {
    cinelabcasestudy: enCineLab,
    moviedashboardcasestudy: enMovieDashboard,
    chefcitoiacasestudy: enChefcitoIA,
    nexustalentcasestudy: enNexusTalent,
    echologcasestudy: enEchoLog,
  },
  es: {
    cinelabcasestudy: esCineLab,
    moviedashboardcasestudy: esMovieDashboard,
    chefcitoiacasestudy: esChefcitoIA,
    nexustalentcasestudy: esNexusTalent,
    echologcasestudy: esEchoLog,
  },
} as const;

export const caseStudyNamespaces = [
  'cinelabcasestudy',
  'moviedashboardcasestudy',
  'chefcitoiacasestudy',
  'nexustalentcasestudy',
  'echologcasestudy',
] as const;