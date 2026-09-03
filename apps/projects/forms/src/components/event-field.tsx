import * as React from "react";

import { Button } from "@gecko/ui/components/button";
import { FieldLegend, FieldSet } from "@gecko/ui/components/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@gecko/ui/components/pagination";
import { Search } from "@gecko/ui/components/search";
import { cn } from "@gecko/ui/lib/utils";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CalendarDays,
  CircleHelp,
  MapPin,
  Plus,
  Ticket,
  Trash2,
} from "lucide-react";

import { currencyFormatter, formatCost } from "../lib/booking";

const SESSIONS_PER_PAGE = 8;

export type EventSession = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  cost: number;
  campus?: string;
};

export type EventFieldEvent = {
  id: string;
  title: string;
  dateTime: string;
  cost: number;
  sessions: EventSession[];
};

type EventFieldProps = {
  event: EventFieldEvent;
  selectedSessionIds?: string[];
  defaultSelectedSessionIds?: string[];
  onSelectedSessionIdsChange?: (sessionIds: string[]) => void;
  /** When set, only sessions matching this campus (or without a campus) are shown. */
  campusFilter?: string | null;
};

export function EventField({
  event,
  selectedSessionIds: selectedSessionIdsProp,
  defaultSelectedSessionIds = [],
  onSelectedSessionIdsChange,
  campusFilter,
}: EventFieldProps) {
  const [search, setSearch] = React.useState("");
  const [sortAscending, setSortAscending] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [uncontrolledSelectedSessionIds, setUncontrolledSelectedSessionIds] =
    React.useState(defaultSelectedSessionIds);

  const isControlled = selectedSessionIdsProp !== undefined;
  const selectedSessionIds = isControlled
    ? selectedSessionIdsProp
    : uncontrolledSelectedSessionIds;

  const availableSessions = React.useMemo(() => {
    if (!campusFilter) return event.sessions;
    return event.sessions.filter(
      (session) => !session.campus || session.campus === campusFilter,
    );
  }, [campusFilter, event.sessions]);

  const displayedSessions = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    return availableSessions
      .filter((session) => {
        if (!query) return true;
        return [session.title, session.date, session.time, session.venue].some(
          (value) => value.toLowerCase().includes(query),
        );
      })
      .toSorted((a, b) =>
        sortAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );
  }, [availableSessions, search, sortAscending]);

  const pageCount = Math.ceil(displayedSessions.length / SESSIONS_PER_PAGE);
  const currentPage = Math.min(page, Math.max(pageCount - 1, 0));
  const paginatedSessions = displayedSessions.slice(
    currentPage * SESSIONS_PER_PAGE,
    (currentPage + 1) * SESSIONS_PER_PAGE,
  );

  const selectedSessions = event.sessions.filter((session) =>
    selectedSessionIds.includes(session.id),
  );
  const totalCost =
    event.cost +
    selectedSessions.reduce((total, session) => total + session.cost, 0);

  function toggleSession(sessionId: string) {
    const next = selectedSessionIds.includes(sessionId)
      ? selectedSessionIds.filter((id) => id !== sessionId)
      : [...selectedSessionIds, sessionId];

    if (!isControlled) {
      setUncontrolledSelectedSessionIds(next);
    }
    onSelectedSessionIdsChange?.(next);
  }

  return (
    <FieldSet className="gap-4">
      <FieldLegend>Event</FieldLegend>

      <div className="border-t pt-4">
        <h2 className="text-balance font-semibold text-sm">{event.title}</h2>
        <p className="text-pretty text-xs text-muted-foreground">
          {event.dateTime}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium">
          <Ticket className="size-3.5 text-muted-foreground" />
          {formatCost(event.cost)}
        </p>
      </div>

      <div className="overflow-hidden rounded-sm border">
        <div className="flex gap-2 border-b bg-muted p-4">
          <Search
            value={search}
            onValueChange={(nextValue) => {
              setSearch(nextValue);
              setPage(0);
            }}
            placeholder="Search sessions"
            aria-label="Search sessions"
            showClear
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={
              sortAscending
                ? "Sort sessions descending"
                : "Sort sessions ascending"
            }
            onClick={() => setSortAscending((current) => !current)}
          >
            {sortAscending ? (
              <ArrowDownAZ aria-hidden />
            ) : (
              <ArrowUpAZ aria-hidden />
            )}
          </Button>
        </div>

        {displayedSessions.length > 0 ? (
          <>
            {paginatedSessions.map((session) => {
              const selected = selectedSessionIds.includes(session.id);

              return (
                <article
                  key={session.id}
                  className={cn(
                    "flex items-start justify-between gap-6 border-b p-4",
                    selected && "bg-muted/20",
                  )}
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{session.title}</h3>
                    <div className="mt-1 flex flex-col gap-1">
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5 shrink-0" />
                        <span>
                          {session.date}, {session.time}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">{session.venue}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Ticket className="size-3.5 shrink-0" />
                        {formatCost(session.cost)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="-ml-2.5 mt-1 text-muted-foreground"
                    >
                      <CircleHelp />
                      View session information
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant={selected ? "outline" : "default"}
                    size="sm"
                    aria-pressed={selected}
                    onClick={() => toggleSession(session.id)}
                  >
                    {selected ? <Trash2 aria-hidden /> : <Plus aria-hidden />}
                    {selected ? "Remove session" : "Book session"}
                  </Button>
                </article>
              );
            })}

            {pageCount > 1 ? (
              <Pagination className="justify-end p-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      iconOnly
                      variant="outline"
                      aria-disabled={currentPage === 0}
                      className={
                        currentPage === 0
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(Math.max(currentPage - 1, 0));
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      iconOnly
                      variant="outline"
                      aria-disabled={currentPage === pageCount - 1}
                      className={
                        currentPage === pageCount - 1
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(Math.min(currentPage + 1, pageCount - 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </>
        ) : (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No sessions found.
          </p>
        )}
      </div>

      {selectedSessions.length > 0 ? (
        <section
          aria-live="polite"
          aria-label="Your event booking"
          className="rounded-sm bg-muted p-4"
        >
          <h2 className="text-balance text-sm font-semibold">Your event</h2>
          <div className="mt-4">
            <p className="text-sm font-semibold">{event.title}</p>
            <p className="text-xs font-medium mt-1">{formatCost(event.cost)}</p>
          </div>

          <h3 className="mt-5 text-xs font-semibold">Event itinerary</h3>
          <div className="mt-2">
            {selectedSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between gap-4 border-b py-2 last:border-b-0"
              >
                <div className="min-w-0 text-xs font-semibold">
                  <p className="truncate">
                    {session.title} - {session.date}, {session.time}
                  </p>
                  <p className="font-medium">{formatCost(session.cost)}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSession(session.id)}
                >
                  <Trash2 />
                  Remove session
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between border-t pt-4">
            <span className="text-sm font-medium">Total</span>
            <span className="font-semibold">
              {currencyFormatter.format(totalCost)}
            </span>
          </div>
        </section>
      ) : null}
    </FieldSet>
  );
}
