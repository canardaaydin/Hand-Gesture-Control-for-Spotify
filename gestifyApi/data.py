#!/usr/bin/python
# -*- coding: utf-8 -*-
import pprint


def extract_auth_code(str):
	arr = str.split('&')
	pprint(arr[0])