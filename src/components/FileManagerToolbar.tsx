import * as React from "react";
import { Toolbar, Button } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Upload } from "@progress/kendo-react-upload";
import { BaseEvent } from "@progress/kendo-react-common";
import { UploadAddEvent } from "../interfaces/FileManagerModels";

export const FileManagerToolbar = (props) => {
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);

  const handleSearchChange = (event: InputChangeEvent) => {
    props.onSearchChange(event);
  };

  const handleNewFolderClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onNewFolderClick(event);
  };

  const handleDialogVisibility = (
    event: BaseEvent<Dialog> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDialogVisible(!dialogVisible);
  };

  const handleFileChange = (event: UploadAddEvent) => {
    props.onFileChange({
      files: event.newState,
      event: event,
    });
  };

  const handleUploadClearList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onClearFileList(event);
  };

  const handleUploadDone = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDialogVisible(!dialogVisible);
    props.onUploadComplete(event);
  };

  return (
    <Toolbar className="k-filemanager-toolbar">
      <Button onClick={handleNewFolderClick}>New Folder</Button>
      <Button onClick={handleDialogVisibility}>Upload</Button>
      {dialogVisible && (
        <Dialog
          title={"Upload Files"}
          className={"k-filemanager-upload-dialog"}
          onClose={handleDialogVisibility}
          contentStyle={{ width: "530px" }}
        >
          <Upload
            batch={false}
            multiple={true}
            files={props.files}
            withCredentials={false}
            onAdd={handleFileChange}
            onRemove={handleFileChange}
            onProgress={handleFileChange}
            onStatusChange={handleFileChange}
            saveUrl={
              "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
            }
            removeUrl={
              "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
            }
          />
          <DialogActionsBar layout={"end"}>
            <Button onClick={handleUploadClearList}> Clear List</Button>
            <Button primary={true} onClick={handleUploadDone}>
              {" "}
              Done{" "}
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

      <div className="k-filemanager-search-tool k-textbox k-toolbar-last-visible">
        <Input
          className="k-input"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <span className="k-input-icon">
          <span className="k-icon k-i-search"></span>
        </span>
      </div>
    </Toolbar>
  );
};
