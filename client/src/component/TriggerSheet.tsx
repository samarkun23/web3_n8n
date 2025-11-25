import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import type { Nodekind, NodeMetadata } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react";



const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes",
}, {
    id: "price-trigger",
    title: "price trigger",
    description: "Runs whenever the price goes above or below a certain number for an assest"
}]

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: Nodekind, metadata: NodeMetadata) => void
}) => {

    const [metadata, setMetadata] = useState([])
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id)

    return <Sheet open={true}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select trigger </SheetTitle>
                <SheetDescription>
                    Select the type of trigger
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>

                                {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                                    <SelectItem id={id} value={id}>{title}</SelectItem>
                                    {/* <SelectLabel>{description}</SelectLabel> */}
                                </>
                                )}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </SheetDescription>
            </SheetHeader>

            <SheetFooter>
                <Button onClick={() => {
                    onSelect(
                        selectedTrigger,
                        metadata
                    )
                }} type="submit">Create Trigger</Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}