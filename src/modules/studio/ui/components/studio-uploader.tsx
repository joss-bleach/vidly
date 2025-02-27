import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: () => void;
}

export const StudioUploader = ({
  endpoint,
  onSuccess,
}: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader
        id="video-uploader"
        className="group/uploader hidden"
        onSuccess={onSuccess}
        endpoint={endpoint}
      />
      <MuxUploaderDrop muxUploader="video-uploader" className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-6">
          <div className="flex size-32 items-center justify-center gap-2 rounded-full bg-muted">
            <UploadIcon className="group/drop-[&[active]]:animate-bounce size-10 text-muted-foreground transition-all duration-300" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm">Drag and drop video files to upload</p>
            <p className="text-xs text-muted-foreground">
              Your videos will be private until you publish them
            </p>
          </div>
          <MuxUploaderFileSelect muxUploader="video-uploader">
            <Button type="button" className="rounded-full">
              Select files
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span slot="separator" className="hidden" />
        <MuxUploaderStatus muxUploader="video-uploader" className="text-sm" />
        <MuxUploaderProgress
          muxUploader="video-uploader"
          className="text-sm"
          type="percentage"
        />
        <MuxUploaderProgress muxUploader="video-uploader" type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};
