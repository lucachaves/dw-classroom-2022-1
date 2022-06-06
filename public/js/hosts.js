import { showChart } from './lib/chart.js';
import { loadHosts, removeHost, showLatency, loadCreateHostSubmit } from './lib/hosts.js';

loadCreateHostSubmit();

loadHosts();

showChart();

window.removeHost = removeHost;
window.showLatency = showLatency;




