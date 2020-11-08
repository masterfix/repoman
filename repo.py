#!/usr/bin/env python3

import sys
import getopt
import argparse
import requests

action_add = 'add'
action_remove = 'remove'


def main():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(title='action', dest='action',
                                       help='which action to perform',
                                       required=True)
    parser.add_argument('-s', '--server', help='url of the repo server',
                        default='http://localhost:3000')

    add_parser = subparsers.add_parser(action_add)
    add_parser.add_argument('pkg', help='path to the pkg file to add',
                            type=argparse.FileType('rb'))

    remove_parser = subparsers.add_parser(action_remove)
    remove_parser.add_argument('pkg', help='name of the pkg to remove')

    args = parser.parse_args()

    if args.action == action_add:
        add(args.pkg, args.server)
    elif args.action == action_remove:
        remove(args.pkg, args.server)


def add(pkg_file, server):
    response = requests.post(f'{server}/add', files={'file': pkg_file})
    print(response.text)


def remove(pkg_name, server):
    response = requests.post(f'{server}/remove', data={'pkg': pkg_name})
    print(response.text)


if __name__ == "__main__":
    main()
