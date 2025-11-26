import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"

interface TopPartnersTableProps {
  data: {
    partnerId: string
    partnerName: string
    totalViews: number
  }[]
}

export function TopPartnersTable({ data }: TopPartnersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Partenaires</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artiste</TableHead>
              <TableHead className="text-right">Vues</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((partner) => (
              <TableRow key={partner.partnerId}>
                <TableCell>
                  <Link
                    href={`/partners/${partner.partnerId}`}
                    className="font-medium hover:underline"
                  >
                    {partner.partnerName}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    {partner.totalViews.toLocaleString()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
