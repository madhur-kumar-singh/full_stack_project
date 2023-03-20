import router from "next/router";
import { useState } from "react";
import { Button, Card, CardContent, Input } from "semantic-ui-react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 10%;
  align-items: center;
`;

const FormLabel = styled.label`
  margin: 10px;
`;

const InputBox = styled(Input)`
  height: 30px;
  width: auto;
`;

const Row = styled.div`
  margin-bottom: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DropDown = styled.select`
  border-radius: 5px;
`;

const Option = styled.option``;

export default function Home() {
  const [status, setStatus] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [line, setLine] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [path, setPath] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [findings, setFindings] = useState(false);

  const showButton = () => {
    router.push("/results");
  };

  const submitButton = async () => {
    const postAPI = await fetch("./api/form-input", {
      method: "POST",
      body: JSON.stringify({
        status: status,
        name: name,
        queuedAt: new Date(),
        findings: {
          type: type,
          ruleId: ruleId,
          location: {
            path: path,
            positions: {
              begin: {
                line: line,
              },
            },
          },
          metadata: {
            description: description,
            severity: severity,
          },
        },
      }),
    });
    const res = await postAPI.json();
    if (res.status=="200") setIsSubmitted(true);
  };

  return (
    <OuterContainer>
      <Card style={{ width: "auto" }}>
        <CardContent>
          <form>
            <Row>
              <FormLabel>Repository Name</FormLabel>
              <InputBox
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
                onClick={() => setIsSubmitted(false)}
              />
            </Row>
            <Row>
              <DropDown
                className="ui dropdown"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <Option value="">Status</Option>
                <Option value="Queued">Queued</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Success">Success</Option>
                <Option value="Failure">Failure</Option>
              </DropDown>
              <FormLabel
                style={{
                  border: "1px solid rgba(34,36,38,.15)",
                  borderRadius: "5px",
                  padding: "8px",
                  width: "30%",
                  justifyContent: "center",
                  display: "flex",
                }}
                onClick={() => setFindings(!findings)}
              >
                Findings
              </FormLabel>
            </Row>
            {findings && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                <Row>
                  <FormLabel>Type</FormLabel>
                  <InputBox
                    value={type}
                    onChange={(e: any) => {
                      setType(e.target.value);
                    }}
                  />
                  <FormLabel>Path</FormLabel>
                  <InputBox
                    value={path}
                    onChange={(e: any) => {
                      setPath(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <FormLabel>Rule ID</FormLabel>
                  <InputBox
                    value={ruleId}
                    onChange={(e: any) => {
                      setRuleId(e.target.value);
                    }}
                  />
                  <FormLabel>Begin line</FormLabel>
                  <InputBox
                    value={line}
                    onChange={(e: any) => {
                      setLine(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <FormLabel>Description</FormLabel>
                  <InputBox
                    value={description}
                    onChange={(e: any) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <FormLabel>Severity</FormLabel>
                  <InputBox
                    value={severity}
                    onChange={(e: any) => {
                      setSeverity(e.target.value);
                    }}
                  />
                </Row>
              </div>
            )}
          </form>
        </CardContent>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={() => {
                submitButton();
              }}
              style={{ margin: "2px", borderRadius: "5px" }}
            >
              Submit
            </Button>
            <Button
              basic
              color="green"
              onClick={() => {
                showButton();
              }}
              style={{ margin: "2px", borderRadius: "5px" }}
            >
              Show Files
            </Button>
          </div>
        </Card.Content>
        {isSubmitted && (
          <CardContent style={{ color: "red" }}>
            Repository is submitted.
          </CardContent>
        )}
      </Card>
    </OuterContainer>
  );
}
