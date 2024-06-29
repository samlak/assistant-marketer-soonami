import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export function SwitchChannel({ 
  channels,
  selectedChannel,
  setSelectedChannel
}) {

  const onChangeProject = (value) => {
    setSelectedChannel(value)
  }

  return (
    <Select value={selectedChannel} onValueChange={onChangeProject}>
      <SelectTrigger className="mr-2 border-primary h-8">
        <SelectValue placeholder="Select Channel" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          { channels.map((channel, key) => (
            <SelectItem value={ channel } key={key}>
              { channel }
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}