import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function Dashboard() {
  return (
    <Card>
      <Title level={4}>Dashboard</Title>
      <Paragraph>Welcome to Student Awareness Portal.</Paragraph>
    </Card>
  )
}