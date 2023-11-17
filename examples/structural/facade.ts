export class VideoFile {
  constructor();
  constructor(filename: string);
  constructor(filename?: string) {}
}
export class OggCompressionCodec {
  //
}
export class MPEG4CompressionCodec {
  //
}
export class CodecFactory {
  constructor(file?: VideoFile) {}
  //
  extract(file: VideoFile) {
    //
  }
}
export class BitrateReader {
  //
  read(filename, sourceCodec) {
    //
  }
  convert(buffer, destinationCodec) {
    //
    return {};
  }
}
export class AudioMixer {
  //
  fix(result) {
    return {};
  }
}
export class VideoConverter {
  convert(filename: string, format?) {
    const file = new VideoFile(filename);
    const sourceCodec = new CodecFactory().extract(file);
    let requiredFormat = format ? format : "ogg";
    let destinationCodec;
    if (format === "mp4") {
      destinationCodec = new MPEG4CompressionCodec();
    }

    if (format === "ogg") {
      destinationCodec = new OggCompressionCodec();
    }
    const buffer = new BitrateReader().read(filename, sourceCodec);
    let result: any = new BitrateReader().convert(buffer, destinationCodec);
    result = new AudioMixer().fix(result);

    return new File(result, filename);
  }
}
export class Application {
  main() {
    const convertor = new VideoConverter();
    const converted = convertor.convert("youtubevideo.ogg", "mp4");
    converted.stream();
  }
}
