import resolveConfig from 'tailwindcss/resolveConfig';
import {Parser} from "@json2csv/plainjs";
import numberFormatter from "@json2csv/formatters/number";
import dayjs from "dayjs";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export async function getgit (owner, repo, path) {
  let data = await fetch (
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  )
      .then (d => d.json ())
      .then (d =>
          fetch (
              `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
          )
      )
      .then (d => d.json ())
      .then (d => JSON.parse (atob (d.content)));

  return data;
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: localStorage.getItem('local_currency'),
  minimumFractionDigits: 2
}).format(value);

export const formatThousands = (value) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const mergeArrays = (arr1, arr2, mergeKey) => {
  const merged = [...arr2];

  arr1.forEach((item) => {
    const existingItem = merged.find((el) => el[mergeKey] === item[mergeKey]);

    if (existingItem) {
      Object.assign(existingItem, item);
    } else {
      merged.push(item);
    }
  });

  return merged;
};

export const downloadObjectAs = (exportObj, exportName, format) => {
  if (format === "JSON") {
    return downloadObjectAsJson(exportObj,exportName);
  } else if (format === "CSV"){
    return downloadObjectAsCSV(exportObj,exportName);
  }
}
const downloadObjectAsJson = (exportObj, exportName) => {
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const downloadObjectAsCSV = (exportObj, exportName) => {
  const parser = new Parser({
        delimiter: '|'
  });
  const csv = parser.parse(exportObj);
  let dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".csv");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export const formatCurrency = (value) => {
  if (isNaN(value)) {
    return '';
  }

  var formatter = new Intl.NumberFormat((new Intl.NumberFormat()).resolvedOptions().locale, {
    style: 'currency',
    currency: localStorage.getItem('local_currency'),
    minimumFractionDigits: 2
  });
  return formatter.format(value);
}

export const formatNumber = (value) => {
  if (isNaN(value)) {
    return '';
  }

  var formatter = new Intl.NumberFormat((new Intl.NumberFormat()).resolvedOptions().locale, {
    style: 'decimal',
    maximumFractionDigits: 2
  });
  return formatter.format(value);
}

export const CHART_FORMAT_DATE = 'YYYY-MM-DD';
export const TRANSACTION_FORMAT_DATE = 'D MMMM YYYY, HH:mm';

export const formatDate = (dateString, template) => {
  const date = dayjs(dateString);
  if(template === null){
    return date.format('D MMMM YYYY, HH:mm');
  }else{
    return date.format(template);
  }
}
