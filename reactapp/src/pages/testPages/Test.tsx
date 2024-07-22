import { useState } from "react";
import {
  Button,
  DropdownButton,
  DropdownItem,
  Form,
  FormControl,
} from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Test = () => {
  const {
    allowedMaxDays,
    allowedDays,
    allowedRange,
    beforeToday,
    afterToday,
    combine,
  } = DateRangePicker;

  const [reporters, setReporters] = useState([
    "John Doe",
    "Jane Doe",
    "Foo Bar",
  ]);

  const [selectedReporter, setSelectedReporter] = useState("");
  const [richText, setRichText] = useState("");
  const [dateRange, setDateRange] = useState<[Date, Date] | null>([
    new Date(),
    new Date(),
  ]);
  const [inputField1, setInputField1] = useState("");
  const [inputField2, setInputField2] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected Reporter:", selectedReporter);
    console.log("Rich Text Content:", richText);
    console.log("Selected Date Range:", dateRange);
    console.log("Input Field 1:", inputField1);
    console.log("Input Field 2:", inputField2);
    console.log("Selected File:", selectedFile);

    // Verileri gönderme işlemi (örneğin bir API'ye gönderme)
    // ...
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <>
      <h1>Test Page</h1>
      <Form onSubmit={handleSubmit}>
        <DateRangePicker
          format="dd.MM.yyyy"
          value={dateRange}
          shouldDisableDate={afterToday()}
          onChange={(range) => {
            setDateRange(range);
          }}
        />
        <br />
        <br />
        <DropdownButton title={selectedReporter || "Select a Reporter"}>
          {reporters.map((reporter) => (
            <DropdownItem
              key={reporter}
              onClick={() => setSelectedReporter(reporter)}
            >
              {reporter}
            </DropdownItem>
          ))}
        </DropdownButton>
        <br />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>File Input</Form.Label>
          <Form.Control type="file" accept=".jpg" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group controlId="inputField1">
          <Form.Label>Header</Form.Label>
          <FormControl
            type="text"
            value={inputField1}
            onChange={(e) => setInputField1(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="inputField2">
          <Form.Label>Subheader</Form.Label>
          <FormControl
            type="text"
            value={inputField2}
            onChange={(e) => setInputField2(e.target.value)}
          />
        </Form.Group>
        <br />
        <h3>Rich Text Editor</h3>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Initial content</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            setRichText(data);
            console.log({ event, editor, data });
          }}
        />
        <br />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default Test;
