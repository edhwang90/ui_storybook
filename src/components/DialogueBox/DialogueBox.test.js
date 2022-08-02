import React from 'react';
import { render, act } from '@testing-library/react';

import { useDialogueBox } from './DialogueBox';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useDialogueBox(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('DialogueBox', () => {
  
  it('closes the dialog box', () => {
    const dialogueBoxHook = setup({ isVisible: true })

    act(() => {
      dialogueBoxHook.closeDialogue();
    })

    expect(dialogueBoxHook.alertVisible).toEqual(false);
  })
})