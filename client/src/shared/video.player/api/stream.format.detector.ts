export type StreamFormat = 'hls' | 'flv' | 'dash' | 'native' | 'unknown';

export const detectFormatByExtension = (url: string): StreamFormat => {
  if (url.endsWith('.m3u8')) return 'hls';
  if (url.endsWith('.flv')) return 'flv';
  if (url.endsWith('.mpd')) return 'dash';
  if (['.mp4', '.webm', '.ogg'].some((ext) => url.endsWith(ext)))
    return 'native';
  return 'unknown';
};

export const detectFormatByMimeType = (
  mimeType: string | null,
): StreamFormat => {
  if (
    mimeType === 'application/vnd.apple.mpegurl' ||
    mimeType === 'application/x-mpegURL'
  )
    return 'hls';
  if (mimeType === 'video/x-flv') return 'flv';
  if (mimeType === 'application/dash+xml') return 'dash';
  if (['video/mp4', 'video/webm', 'video/ogg'].includes(mimeType || ''))
    return 'native';
  return 'unknown';
};

export const detectFormatByContent = (content: string | null): StreamFormat => {
  if (content?.includes('#EXTM3U')) return 'hls';
  if (content?.startsWith('FLV')) return 'flv';
  return 'unknown';
};

export const fetchMimeType = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.headers.get('content-type');
  } catch (error) {
    console.error('Failed to fetch MIME type:', error);
    return null;
  }
};

export const fetchStreamHeader = async (
  url: string,
): Promise<string | null> => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const text = await response.text();
    return text.slice(0, 100);
  } catch (error) {
    console.error('Failed to fetch stream header:', error);
    return null;
  }
};

export const determineStreamFormat = async (
  url: string,
): Promise<StreamFormat> => {
  let format: StreamFormat = 'unknown';

  format = detectFormatByExtension(url);
  if (format !== 'unknown') return format;

  const mimeType = await fetchMimeType(url);
  format = detectFormatByMimeType(mimeType);
  if (format !== 'unknown') return format;

  const content = await fetchStreamHeader(url);
  format = detectFormatByContent(content);

  return format;
};
