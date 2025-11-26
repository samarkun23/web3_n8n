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
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "@/components/ui/input";



const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes",
}, {
    id: "price-trigger",
    title: "price trigger",
    description: "Runs whenever the price goes above or below a certain number for an assest"
}]

const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: Nodekind, metadata: NodeMetadata) => void
}) => {

    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id)

    return <Sheet open={true}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select trigger </SheetTitle>
                <SheetDescription>
                    Select the type of trigger
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an assest" />
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

                    {selectedTrigger === 'timer' && <div>
                        <div className="pt-4">
                            Number of seconds after which to run the timer 
                        </div>
                        <Input value={metadata.time} onChange={(e) => setMetadata(metadata => ({
                            ...metadata,
                            time: Number(e.target.value)
                        }))}></Input>

                    </div>}

                    {selectedTrigger === 'price-trigger' && <div>
                        <div className="pt-4">
                        Price:
                        </div>
                        <Input type="text" onChange={(e) => setMetadata(m => ({
                            ...m,
                            price: Number(e.target.value)
                        }))} ></Input>
                        <div className="pt-4">
                        Asset
                        </div>
                        <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
                            ...metadata,
                            asset: value
                        }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select and asset " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    {SUPPORTED_ASSETS.map((id) => <>
                                        <SelectItem id={id} value={id}>{id}</SelectItem>
                                    </>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>}

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