import { render, screen, fireEvent } from '@testing-library/react';
import Autocomplete from "../components/Autocomplete";

describe("Test that the component renders without crashing", () => {
  it("renders without crashing", () => {
    render(<Autocomplete onSubmit={() => {}} />);
  });
});

describe("Test that the onSubmit function is called when the form is submitted", () => {
  it("calls onSubmit when the form is submitted", () => {
    const handleSubmit = jest.fn();
    const { getByRole } = render(<Autocomplete onSubmit={handleSubmit} />);
    const input = getByRole("textbox");
    const submitButton = getByRole("button");

    fireEvent.change(input, { target: { value: "apple" } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith("apple");
  });
});

describe("Test that the handleChange function updates the state correctly", () => {
  it("updates the input value when the input changes", () => {
    const { getByRole } = render(<Autocomplete onSubmit={() => {}} />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "apple" } });

    expect(input).toHaveValue("apple");
  });

  it("updates the filtered data when the input changes", async () => {
    jest.useFakeTimers();
    const { getByRole, findByText } = render(
      <Autocomplete onSubmit={() => {}} />
    );
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "apple" } });

    // wait for the filterData function to complete
    await jest.runOnlyPendingTimers();

    const item = await findByText("Apple");
    expect(item).toBeInTheDocument();
  });
});

describe("Test that the handleOptionClick function updates the state correctly", () => {
  it("updates the input value and filtered data when an option is clicked", () => {
    const { getByText, getByRole } = render(<Autocomplete onSubmit={() => {}} />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "apple" } });

    const option = getByText("Apple");
    fireEvent.click(option);

    expect(input).toHaveValue("Apple");
    expect(getByText("Banana")).toBeInTheDocument();
  });
});
