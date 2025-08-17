import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, File, X, Plus } from "lucide-react";

interface MedicalFileUploadProps {
  onFilesUploaded: (files: File[]) => void;
}

interface FileWithCategory {
  file: File;
  category: string;
}

export default function MedicalFileUpload({ onFilesUploaded }: MedicalFileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileWithCategory[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentCategories = [
    "Lab Results",
    "Imaging Reports",
    "Pathology Reports",
    "Treatment Records",
    "Medication History",
    "Consultation Notes",
    "Surgical Reports",
    "Other Medical Records"
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFilesWithCategory = files.map(file => ({
      file,
      category: ""
    }));
    setSelectedFiles(prev => [...prev, ...newFilesWithCategory]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newFilesWithCategory = files.map(file => ({
      file,
      category: ""
    }));
    setSelectedFiles(prev => [...prev, ...newFilesWithCategory]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateFileCategory = (index: number, category: string) => {
    setSelectedFiles(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, category } : item
      )
    );
  };

  const handleUpload = async () => {
    const validFiles = selectedFiles.filter(item => item.category);
    if (validFiles.length === 0) return;

    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onFilesUploaded(validFiles.map(item => item.file));
    setSelectedFiles([]);
    setIsUploading(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const canUpload = selectedFiles.length > 0 && selectedFiles.every(item => item.category);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-az-magenta hover:bg-gray-50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-600 mb-2">
          Drop your medical files here or click to browse
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supports PDF, JPEG, PNG up to 25MB per file
        </p>
        <Button variant="outline" className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white">
          <Plus className="w-4 h-4 mr-2" />
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Selected Files</h4>
          {selectedFiles.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{item.file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(item.file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Document Category *
                </Label>
                <Select 
                  value={item.category} 
                  onValueChange={(value) => updateFileCategory(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select document category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          
          <Button
            onClick={handleUpload}
            disabled={!canUpload || isUploading}
            className="w-full bg-az-magenta hover:bg-pink-700 text-white"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Uploading Files...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>
      )}

      {/* Upload Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Upload Instructions</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure all documents are clearly legible and complete</li>
          <li>• Remove any personal information you don't want to share</li>
          <li>• Categorize each document accurately for faster review</li>
          <li>• Upload the most recent versions of your medical records</li>
          <li>• Contact support if you have questions about document types</li>
        </ul>
      </div>
    </div>
  );
}