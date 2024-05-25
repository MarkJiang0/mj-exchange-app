import React from 'react'
import Box from './Box'
import styled from 'styled-components/native'
import { TexBoxtProps } from './types'
import { textAlign } from 'styled-system'

const TextBox = (chilldren: any) => {
  return (
    <Box>
      <Text>{chilldren}</Text>
    </Box>
  )
}

export default TextBox

const Text = styled.Text<TexBoxtProps>`
  
`;